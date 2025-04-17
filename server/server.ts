import express from "express";
import cors from "cors";
import { PORT } from "./src/utils/env";


const server = express();

server.use(express.json());
// server.use(cors({ origin: ["http://localhost:3000", "deployed-url"] }));
server.use(express.urlencoded({ extended: true }));


server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});