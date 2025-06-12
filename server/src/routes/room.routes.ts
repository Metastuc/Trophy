// src/routes/room.routes.ts
import { Router } from "express";
import { createStream } from "../controllers/room.controller.js";

const router = Router();

router.post("/", createStream);

router.get("/", (req, res) => {
    res.status(200).send("🚀 Server is working!");
});
export default router;
