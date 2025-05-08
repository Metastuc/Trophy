import express from "express";
import cors from "cors";
import { PORT } from "./src/utils/env.js";
import roomRoutes from "./src/routes/room.routes.js";
import accessTokenRoutes from "./src/routes/accessToken.routes.js";

const server = express();

// server.use(cors({ origin: ["http://localhost:3000", "deployed-url"] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/create-stream", roomRoutes);
server.use("/api", roomRoutes);

server.use("/api/access-stream", accessTokenRoutes);

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});