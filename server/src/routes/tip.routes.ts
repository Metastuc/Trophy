import { Router } from 'express';
import { sendTip } from '../controllers/tip.controller.js';

const router = Router();

router.post('/send', sendTip);

export default router; 