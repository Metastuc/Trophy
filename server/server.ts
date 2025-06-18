import express from "express";
import cors from "cors";
import appRoutes from "./src/routes/appRoutes.routes";
import DB from "./src/config/db";
import { PORT } from "./src/utils/env";
import { Server } from "socket.io";
import { User } from "./src/models/userSchema";

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

  socket.on("followed", async (data) => {
    console.log(`🔔 User followed: ${data}`);
    const { email, username } = data; // username is the reciever's username

    const follower = await User.findOne({ email });
    const reciever = await User.findOne({ username });

    if (follower && reciever) {
      follower.following.push(username);
      reciever.followers.push(follower.username);
      reciever.notifications.length === 6 ? reciever.notifications.pop() : "";
      reciever.notifications.push(`${follower.username} followed you!`);
      await follower.save();
      await reciever.save();

      const recieverSocketId = userSocketIds.get(username);
      io.to(recieverSocketId).emit("followed", data);
    }
  });

  socket.on("send-tip-notis", async (tipData) => {
    console.log(`💰 Tip sent: ${tipData}`);

    const { email, username, token, amount } = tipData;

    const follower = await User.findOne({ email });
    const reciever = await User.findOne({ username });

    if (follower && reciever) {
      reciever.notifications.length === 6 ? reciever.notifications.pop() : "";
      reciever.notifications.push(`${follower.username} tipped you ${amount} ${token}!`);
      await reciever.save();
    }

    const recieverSocketId = userSocketIds.get(tipData.username);
    io.to(recieverSocketId).emit("tipped", tipData);
  });

  socket.on("join-chat", (data) => {
    socket.join(data.roomId);
  });

  socket.on("chat-message", (data) => {
    console.log(`💬 Message from ${data.username}: ${data.message}`);
    io.to(data.roomId).emit("chat-message", data);
  });
});
