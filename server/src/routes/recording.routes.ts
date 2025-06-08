import { Router } from "express";
import { startRecording, stopRecording, endLivestream, getRecordingUrl } from "../controllers/recording.controller.js";

const router = Router();

router.post("/start", startRecording);
router.post("/stop", stopRecording);
router.post("/end-stream", endLivestream);
router.get("/url/:roomId", getRecordingUrl);

export default router;
