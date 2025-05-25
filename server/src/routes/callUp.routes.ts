import { Router } from "express";
import { createCallUpRequest, updateCallUpRequest } from "../controllers/callUp.controller.js";

const router = Router();

// Create a new call-up request
router.post("/create", createCallUpRequest);

// Update an existing call-up request
router.post("/update", updateCallUpRequest);

export default router; 