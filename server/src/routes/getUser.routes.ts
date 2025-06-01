import { Router } from "express";
import { getUser } from "../controllers/getUser.controller.js";

const router = Router();

// Get user information including totalStreams, epicStream, topHolders, username, and pfp
router.post("/", getUser);

export default router; 