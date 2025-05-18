import { Router } from "express";
import { authUser } from "../controllers/authUser.controller.js";

const router = Router();

router.post("/", authUser);

export default router;