import { Router } from 'express';
import { startRecording, stopRecording, endLivestream } from '../controllers/recording.controller.js';

const router = Router();

router.post('/start', startRecording);
router.post('/stop', stopRecording);
router.post('/end-stream', endLivestream);

export default router; 