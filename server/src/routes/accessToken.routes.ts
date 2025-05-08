// src/routes/accessToken.routes.ts
import { Router } from "express";
import { getAccessToken } from "../controllers/accessToken.controller.js";

const router = Router();

router.post("/access-stream", getAccessToken);

export default router;
