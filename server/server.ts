import express from "express";
import cors from "cors";
import { PORT } from "./src/utils/env.js";
import roomRoutes from "./src/routes/room.routes.js";
import accessTokenRoutes from "./src/routes/accessToken.routes.js";
import authUserRoutes from "./src/routes/authUser.routes.js";
import signUpRoutes from "./src/routes/signUp.routes.js";

const server = express();

server.use(cors({ origin: ["http://localhost:5173", "deployed-url"] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/create-stream", roomRoutes);
// server.use("/api", roomRoutes);

server.use("/api/access-stream", accessTokenRoutes);

server.use("/api/auth-user", authUserRoutes);

server.use("/api/sign-up", signUpRoutes);

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});