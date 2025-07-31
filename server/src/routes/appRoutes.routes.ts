import { Router } from "express";
import { signIn } from "../controllers/sign-in.controller";
import { updateProfile, feesUpdate, updatePfp } from "../controllers/updateUser.controller";
import { getUser } from "../controllers/getUser.controller";
import { createStream, stopStream } from "../controllers/stream.controller";
import { scheduleActions } from "../controllers/scheduleActions.controller";
import { getAccessToken } from "../controllers/accessToken.controller";
import { getGuestAccessToken } from "../controllers/guest.controller";
import { authUser } from "../controllers/authUser.controller";
import { startRecording, stopRecording, endLivestream, getRecordingUrl } from "../controllers/recording.controller";
import { authenticate } from "../middlewares/authenticate";
import { onboard } from "../controllers/onboard.controller";
import { uploadPfp } from "../utils/pfp";
import { getStream } from "../controllers/getStream.controller";
import { createLiveStream } from "../controllers/createLiveStream";

const router = Router();

router
  .post("/onboard", uploadPfp.single("pfp"), authenticate, onboard)
  .post("/create-stream", authenticate, createStream)
  .post("/create-live-stream", authenticate, createLiveStream)
  .post("/join-stream", getAccessToken)
  .post("/update-stream", authenticate, scheduleActions)
  .post("/update-fees", feesUpdate)
  .post("/stop-stream", authenticate, stopStream)

  .post("/get-user", getUser)
  .patch("/update-profile", authenticate, updateProfile)
  .post("/fetch-user", authenticate, authUser)
  .post("/add-guest", getGuestAccessToken)
  .post("/update-pfp", uploadPfp.single("pfp"), updatePfp)

  .post("/recording/start", startRecording)
  .post("/recording/stop", stopRecording)
  .post("/recording/end-stream", endLivestream)
  .get("/stream/:roomId", getStream)
  .get("/recording/url/:roomId", getRecordingUrl);

export default router;
