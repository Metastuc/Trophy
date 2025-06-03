import express from "express";
import cors from "cors";
import appRoutes from "./src/routes/appRoutes.routes";
import DB from "./src/config/db";
import { PORT } from "./src/utils/env";
import chatRoutes from "./src/routes/chat.routes.js";
import tipRoutes from "./src/routes/tip.routes.js";

const server = express();

server.use(cors({ origin: ["http://localhost:5173", "deployed-url"] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", appRoutes);

server.use("/api/chat", chatRoutes);

server.use("/api/tip", tipRoutes);

server.listen(PORT, async () => {
  console.log(`✅ Server is running on port ${PORT}`);
  await DB();
});
