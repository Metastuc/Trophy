import express from "express";
import cors from "cors";
import { PORT } from "./src/utils/env";
import appRoutes from "./src/routes/appRoutes.routes";
import DB from "./src/config/db";

const server = express();

server.use(cors({ origin: ["http://localhost:5173", "deployed-url"] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", appRoutes);

server.listen(PORT, async () => {
  console.log(`✅ Server is running on port ${PORT}`);
  await DB();
});
