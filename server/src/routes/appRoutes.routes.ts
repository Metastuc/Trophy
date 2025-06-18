import { Router } from "express";
import { signIn } from "../controllers/sign-in.controller";
import { updateProfile, feesUpdate } from "../controllers/updateUser.controller";
import { getUser } from "../controllers/getUser.controller";
import { createStream } from "../controllers/stream.controller";
import { scheduleActions } from "../controllers/scheduleActions.controller";
import { getAccessToken } from "../controllers/accessToken.controller";
import { getGuestAccessToken } from "../controllers/guest.controller";
import { authUser } from "../controllers/authUser.controller";
import { startRecording, stopRecording, endLivestream, getRecordingUrl } from "../controllers/recording.controller";

const router = Router();

router
  .post("/sign-in", signIn)
  .post("/create-stream", createStream)
  .post("/join-stream", getAccessToken)
  .post("/update-stream", scheduleActions)
  .post("/update-fees", feesUpdate)

  .post("/get-user", getUser)
  .post("/update-profile", updateProfile)
  .post("/fetch-user", authUser)
  .post("/add-guest", getGuestAccessToken)

  .post("/recording/start", startRecording)
  .post("/recording/stop", stopRecording)
  .post("/recording/end-stream", endLivestream)
  .get("/recording/url/:roomId", getRecordingUrl);

export default router;
