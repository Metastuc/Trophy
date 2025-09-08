import { Router } from "express";
import {
  updateProfile,
  saveStreamThumbnail,
  feesUpdate,
  creatorTokenCreated,
  updatePfp,
} from "@/controllers/updateUser.controller";
import { getUser } from "@/controllers/getUser.controller";
import { createStream, stopStream } from "@/controllers/stream.controller";
import { scheduleActions } from "@/controllers/scheduleActions.controller";
import { getAccessToken } from "@/controllers/accessToken.controller";
import { getGuestAccessToken } from "@/controllers/guest.controller";
import { authUser } from "@/controllers/authUser.controller";
import { authenticate } from "@/middlewares/authenticate";
import { onboard } from "@/controllers/onboard.controller";
import { uploadImg } from "@/utils/imgs";
import { getStream } from "@/controllers/getStream.controller";
import { leaderboard } from "@/controllers/leaderboard.controller";
import { fetchStreams } from "@/controllers/fetchStreams.controller";
import { createTokenUri } from "@/controllers/pinata";
import { trackTipTxs, getTipTxs } from "@/controllers/tipTxs.controller";

const router = Router();

router
  .post("/onboard", uploadImg.single("profilePicture"), authenticate, onboard)
  .post("/create-stream", authenticate, createStream)
  .post("/join-stream", getAccessToken)
  .post("/update-stream", authenticate, scheduleActions)
  .post("/update-fees", authenticate, feesUpdate)
  .post("/stop-stream", authenticate, stopStream)

  .post("/get-user", getUser)
  .patch("/update-profile", authenticate, uploadImg.single("profilePicture"), updateProfile)
  .post("/fetch-user", authenticate, authUser)
  .post("/add-guest", getGuestAccessToken)
  .post("/update-pfp", authenticate, uploadImg.single("pfp"), updatePfp)
  .post("/save-thumbnail", authenticate, uploadImg.single("thumbnail"), saveStreamThumbnail)

  .get("/fetch-streams", fetchStreams)
  .post("/create-token-uri", authenticate, createTokenUri)
  .get("/leaderboard", leaderboard)
  .post("/track-tip", trackTipTxs)
  .get("/tip-txs", getTipTxs)
  .post("/save-creator-token", authenticate, creatorTokenCreated)
  .get("/stream/:roomId", getStream);

export default router;
