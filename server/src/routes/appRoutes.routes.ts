import { Router } from "express";
import { updateProfile, feesUpdate, creatorTokenCreated, updatePfp } from "../controllers/updateUser.controller";
import { getUser } from "../controllers/getUser.controller";
import { createStream, stopStream } from "../controllers/stream.controller";
import { scheduleActions } from "../controllers/scheduleActions.controller";
import { getAccessToken } from "../controllers/accessToken.controller";
import { getGuestAccessToken } from "../controllers/guest.controller";
import { authUser } from "../controllers/authUser.controller";
import { authenticate } from "../middlewares/authenticate";
import { onboard } from "../controllers/onboard.controller";
import { uploadPfp } from "../utils/pfp";
import { getStream } from "../controllers/getStream.controller";
import { leaderboard } from "../controllers/leaderboard.controller";
import { fetchStreams } from "../controllers/fetchStreams.controller";

const router = Router();

router
  .post("/onboard", uploadPfp.single("profilePicture"), authenticate, onboard)
  .post("/create-stream", authenticate, createStream)
  .post("/join-stream", getAccessToken)
  .post("/update-stream", authenticate, scheduleActions)
  .post("/update-fees", authenticate, feesUpdate)
  .post("/stop-stream", authenticate, stopStream)

  .post("/get-user", getUser)
  .patch("/update-profile", authenticate, uploadPfp.single("profilePicture"), updateProfile)
  .post("/fetch-user", authenticate, authUser)
  .post("/add-guest", getGuestAccessToken)
  .post("/update-pfp", authenticate, uploadPfp.single("pfp"), updatePfp)

  .get("/stream/:roomId", getStream)
  .get("/fetch-streams", fetchStreams)
  .get("/leaderboard", leaderboard)
  .post("/save-creator-token", authenticate, creatorTokenCreated);

export default router;
