import express from "express";
import cors from "cors";
import { PORT } from "./src/utils/env.js";
import roomRoutes from "./src/routes/room.routes.js";
import accessTokenRoutes from "./src/routes/accessToken.routes.js";
import authUserRoutes from "./src/routes/authUser.routes.js";
import signUpRoutes from "./src/routes/signUp.routes.js";
import chatRoutes from "./src/routes/chat.routes.js";
import tipRoutes from "./src/routes/tip.routes.js";
import recordingRoutes from "./src/routes/recording.routes.js";
import callUpRoutes from "./src/routes/callUp.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import getUserRoutes from "./src/routes/getUser.routes.js";

import Moralis from "moralis";
const server = express();
import dotenv from 'dotenv';

dotenv.config();

server.use(cors({ origin: ["http://localhost:5173", "deployed-url"] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/create-stream", roomRoutes);
server.use("/api", roomRoutes);

server.use("/api/access-stream", accessTokenRoutes);

server.use("/api/auth-user", authUserRoutes);

server.use("/api/sign-up", signUpRoutes);

server.use("/api/chat", chatRoutes);

server.use("/api/tip", tipRoutes);

server.use("/api/recording", recordingRoutes);

server.use("/api/getUser", getUserRoutes);

server.use("/api/get-profile", profileRoutes);

server.use("/api/call-up", callUpRoutes);

const startServer = async () => {
  const moralisApiKey = process.env.MORALIS_API_KEY;
  await Moralis.start({
    apiKey: moralisApiKey,
  });

  server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};

startServer();