import express from "express";
import cors from "cors";
import appRoutes from "./src/routes/appRoutes.routes";
import DB from "./src/config/db";
import { PORT } from "./src/utils/env";
import { Server } from "socket.io";

const server = express();

server.use(cors({ origin: ["http://localhost:5173", "deployed-url"] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", appRoutes);

const io = new Server(server.listen(PORT, async () => {
  console.log(`✅ Server is running on port ${PORT}`);
  await DB();
}), { pingTimeout: 60000});

io.on("connection", (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);
  // Add more socket event listeners here as needed
});