import express from "express";
import cors from "cors";
import appRoutes from "./src/routes/appRoutes.routes";
import DB from "./src/config/db";
import { PORT } from "./src/utils/env";
import { Server } from "socket.io";
import { User, Notification } from "./src/models/userSchema";

const server = express();

server.use(cors({ origin: ["http://localhost:5173", "deployed-url"] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", appRoutes);

const io = new Server(
  server.listen(PORT, async () => {
    console.log(`✅ Server is running on port ${PORT}`);
    await DB();
  }),
  { pingTimeout: 60000 },
);

const userSocketIds = new Map();

io.on("connection", (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  socket.on("registered", (data) => {
    console.log(`🔔 User registered: ${data}`);
    userSocketIds.set(data.username, socket.id);
  });

  const toLocaleString = (number: string) => {
    return Number(number).toFixed(1).toLocaleString();
  };

  function formatNumber(num: string) {
    const amount = Number(num);
    if (amount >= 1000000000000) return (amount / 1000000000000).toFixed(1).replace(/\.0$/, "") + "T";
    if (amount >= 1000000000) return (amount / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    if (amount >= 1000000) return (amount / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (amount >= 1000) return (amount / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return amount.toString();
  }

  socket.on("followed", async (data) => {
    const { email, username } = data;
    const follower = await User.findOne({ email });
    const reciever = await User.findOne({ username });

    if (!follower || !reciever) return;

    follower.following.push(username);
    reciever.followers.push(username);

    const followMessage = `${follower.username} followed you`;

    const now = new Date();
    const notification = await Notification.findOne({ username });

    if (!notification) {
      await Notification.create({ username, follow: { followNots: [followMessage], follwedAt: now } });
      const recieverSocketId = userSocketIds.get(reciever.username);

      io.to(recieverSocketId).emit("followed");
      return;
    }

    const recentFollow = now.getTime() - new Date(notification.follow!.followedAt).getTime() < 60 * 60 * 1000;
    let content = notification.follow!.content;

    if (recentFollow) {
      content = `${username} and ${notification.follow!.recentFollows} others followed you`;
      notification.follow!.recentFollows += 1;
      notification.follow!.followNots[0] = content;
    } else {
      notification.follow!.followNots.push(followMessage);
      notification.follow!.content = followMessage;
      notification.follow!.recentFollows = 1;
    }

    await follower.save();
    await reciever.save();
    await notification.save();

    const recieverSocketId = userSocketIds.get(reciever.username);
    io.to(recieverSocketId).emit("followed");
  });

  socket.on("send-tip-notis", async (tipData) => {
    const { email, username, token, amount } = tipData;

    const sender = await User.findOne({ email });
    const reciever = await User.findOne({ username });

    if (!sender || !reciever) return;

    const notification = await Notification.findOne({ username });

    const localeAmount = toLocaleString(amount as string);

    const tipMessage = { tipper: sender.username, amount: localeAmount, token };

    if (!notification) {
      await Notification.create({
        username,
        tip: [tipMessage],
      });
      const recieverSocketId = userSocketIds.get(username);

      io.to(recieverSocketId).emit("tipped");
      return;
    }

    notification.tip.push(tipMessage);

    await reciever.save();
    await notification.save();

    const recieverSocketId = userSocketIds.get(reciever.username);
    io.to(recieverSocketId).emit("tipped");
  });

  socket.on("buy", async (data) => {
    const { buyer, streamer, amount } = data;
    const notification = await Notification.findOne({ username: streamer });

    const buyMessage = `${buyer} bought ${formatNumber(amount)} of your troph`;

    if (!notification) {
      await Notification.create({ buy: [buyMessage] });
      return;
    }

    notification.buy.push(buyMessage);
    await notification.save();

    const recieverSocketId = userSocketIds.get(streamer);
    io.to(recieverSocketId).emit("buy");
  });

  socket.on("join-chat", (data) => {
    socket.join(data.roomId);
  });

  socket.on("chat-message", (data) => {
    console.log(`💬 Message from ${data.username}: ${data.message}`);
    io.to(data.roomId).emit("chat-message", data);
  });
});
