import express from "express";
import cors from "cors";
import appRoutes from "./src/routes/appRoutes.routes";
import DB, { prisma } from "./src/config/db";
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
    // await DB();
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

  socket.on("followed", async (data: { email: string; username: string }) => {
    const { email, username } = data;
    const follower = await prisma.user.findUnique({ where: { email } });
    const reciever = await prisma.user.findUnique({ where: { username } });

    if (!follower || !reciever) return;

    follower.following.push(username);
    reciever.followers.push(username);

    const followMessage = `${follower.username} followed you`;

    const now = new Date();
    const notification = await prisma.notification.findUnique({
      where: { username }
    });

    if (!notification) {
      await prisma.notification.create({
        data: {
          username,
          followNots: [followMessage],
          followedAt: now
        }
      });
      const recieverSocketId = userSocketIds.get(reciever.username);

      io.to(recieverSocketId).emit("followed");
      return;
    }

    const recentFollow = now.getTime() - new Date(notification.followedAt).getTime() < 60 * 60 * 1000;

    if (recentFollow) {
      const content = `${username} and ${notification.recentFollows} others followed you`;
      notification.recentFollows += 1;
      notification.followNots[0] = content;
    } else {
      notification.followNots.push(followMessage);
      notification.followContent = followMessage;
      notification.recentFollows = 1;
    }

    await prisma.user.update({
      where: { email },
      data: follower
    });
    await prisma.user.update({
      where: { username },
      data: reciever
    });
    await prisma.notification.update({
      where: { username },
      data: notification
    });

    const recieverSocketId = userSocketIds.get(reciever.username);
    io.to(recieverSocketId).emit("followed");
  });

  socket.on("send-tip-notis", async (tipData: { email: string; username: string; token: string; amount: string }) => {
    const { email, username, token, amount } = tipData;

    const sender = await prisma.user.findUnique({ where: { email } });
    const reciever = await prisma.user.findUnique({ where: { username } });

    if (!sender || !reciever) return;

    const notification = await prisma.notification.findUnique({
      where: { username }
    });

    const localeAmount = toLocaleString(amount as string);

    const tipMessage = { tipper: sender.username, amount: localeAmount, token };

    if (!notification) {
      await prisma.notification.create({
        data: {
          username,
          tip: [tipMessage],
        }
      });
      const recieverSocketId = userSocketIds.get(username);

      io.to(recieverSocketId).emit("tipped");
      return;
    }

    notification.tip.push(tipMessage);

    await prisma.user.update({
      where: { username },
      data: reciever
    });
    await prisma.notification.update({
      where: { username },
      data: notification
    });

    const recieverSocketId = userSocketIds.get(reciever.username);
    io.to(recieverSocketId).emit("tipped");
  });

  socket.on("buy", async (data: { buyer: string; streamer: string; amount: string }) => {
    const { buyer, streamer, amount } = data;
    const notification = await prisma.notification.findUnique({
      where: { username: streamer }
    });

    const buyMessage = `${buyer} bought ${formatNumber(amount)} of your troph`;

    if (!notification) {
      await prisma.notification.create({
        data: {
          buy: [buyMessage],
          username: streamer
        }
      });
      return;
    }

    notification.buy.push(buyMessage);
    await prisma.notification.update({
      where: { username: streamer },
      data: notification
    });

    const recieverSocketId = userSocketIds.get(streamer);
    io.to(recieverSocketId).emit("buy");
  });

  socket.on("join-chat", (data: { roomId: string }) => {
    socket.join(data.roomId);
  });

  socket.on("update-role", async (username: string) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return;

    const updatedUser = await prisma.user.update({
      where: { username },
      data: { role: "guest" }
    });

    socket.emit("saved", updatedUser);
  });

  socket.on("save-viewers", async (data: { username: string; roomId: string; viewers: number }) => {
    const { username, viewers, roomId } = data;

    const user = await prisma.user.findUnique({ where: { username } });
    const room = await prisma.stream.findUnique({ where: { roomId } });

    if (!user || !room) {
      return;
    }

    await prisma.stream.update({
      where: { roomId },
      data: { viewers }
    });

    if (user.epicStreams > viewers) {
      return;
    }

    await prisma.user.update({
      where: { username },
      data: { epicStreams: viewers }
    });
  });

  socket.on("chat-message", (data: { username: string; message: string; roomId: string }) => {
    console.log(`💬 Message from ${data.username}: ${data.message}`);
    io.to(data.roomId).emit("chat-message", data);
  });
});
