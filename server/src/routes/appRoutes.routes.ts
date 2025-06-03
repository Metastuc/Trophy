import { Router } from "express";
import { signUp } from "../controllers/signUp.controller";
import { updateProfile } from "../controllers/updateProfile.controller";
import { getUser } from "../controllers/getUser.controller";
import { createStream } from "../controllers/stream.controller";
import { scheduleActions } from "../controllers/scheduleActions.controller";
import { getAccessToken } from "../controllers/accessToken.controller";
import { getGuestAccessToken } from "../controllers/guest.controller";
import { authUser } from "../controllers/authUser.controller";

const router = Router();

router
	.post("/sign-up", signUp)
	.post("/create-stream", createStream)
	.post("/join-stream", getAccessToken)
	.post("/update-stream", scheduleActions)
	.post("/get-user", getUser)
	.post("/update-profile", updateProfile)
	.post("/fetch-user", authUser)
	.post("/add-guest", getGuestAccessToken);

export default router;
