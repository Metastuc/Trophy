import express from "express";
import cors from "cors";
import appRoutes from "./src/routes/appRoutes.routes";
import DB from "./src/config/db";
import { CORS_ORIGINS, PORT } from "./src/utils/env";
import { Socket, Server } from "socket.io";
import { User, Notification } from "./src/models/userSchema";
import { formatNumber } from "./src/utils/utils";
import { Stream } from "./src/models/streamSchema";

const server = express();

server.use(cors({ origin: CORS_ORIGINS }));
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

io.on("connection", (socket: Socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  socket.on("registered", (data: { username: string }) => {
    console.log(`🔔 User registered: ${data}`);
    userSocketIds.set(data.username, socket.id);
  });

  const toLocaleString = (number: string) => {
    return Number(number).toFixed(1).toLocaleString();
  };

  socket.on("followed", async (data: { email: string, username: string }) => {
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

    const recentFollow = (now.getTime() - new Date(notification.follow!.followedAt).getTime()) < 60 * 60 * 1000;

    if (recentFollow) {
      const content = `${username} and ${notification.follow!.recentFollows} others followed you`;
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

  socket.on("send-tip-notis", async (tipData: { email: string, username: string, token: string, amount: string }) => {
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

  socket.on("buy", async(data: { buyer: string, streamer: string, amount: string }) => {
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

  socket.on("join-chat", (data: {roomId: string}) => {
    socket.join(data.roomId);
  });

  socket.on("update-role", async (username: string) => {
    const user = await User.findOne({ username });
    if (!user) return

    user.role = "guest";

    await user.save();

    socket.emit("saved", user);
  });

  socket.on("save-viewers", async (data: { username: string, roomId: string, viewers: number }) => {
    const { username, viewers, roomId } = data;

    const user = await User.findOne({ username });
    const room = await Stream.findOne({ roomId });

    if (!user || !room) {
      return
    }

    if (user.epicStreams > viewers) {
      return
    }

    room.viewers = viewers;

    user.epicStreams = viewers;

    await room.save();
    await user.save();
  })

  socket.on("chat-message", (data: { username: string, message: string, roomId: string }) => {
    console.log(`💬 Message from ${data.username}: ${data.message}`);
    io.to(data.roomId).emit("chat-message", data);
  });
});
