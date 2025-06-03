import { Router } from "express";
import { signUp } from "../controllers/signUp.controller";
import { getProfile } from "../controllers/getProfile.controller";
import { getUser } from "../controllers/getUser.controller";
import { createStream } from "../controllers/stream.controller";
import {
	createCallUpRequest,
	updateCallUpRequest,
} from "../controllers/callUp.controller";
import { getAccessToken } from "../controllers/accessToken.controller";

const router = Router();

router
	.post("/sign-up", signUp)
	.post("/create-stream", createStream)
	.post("/join-stream", getAccessToken)
	.post("/create/call-up", createCallUpRequest)
	.post("/update/call-up", updateCallUpRequest)
	.post("/get-user", getUser)
	.post("/get-profile", getProfile);

export default router;
