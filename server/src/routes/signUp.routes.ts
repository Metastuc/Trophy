import { Router } from "express";
import { signUp } from "../controllers/signUp.controller.js";

const router = Router();

router.post("/", signUp);

export default router;