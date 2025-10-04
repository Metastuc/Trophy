import { Router } from "express";

import { upload } from "#middleware/multer.ts";
import { privyAuth } from "#middleware/privy-auth.ts";

import { createStream } from "./create.controller";
import { endStream } from "./end.controller";
import { publicFeedContent } from "./feed.controller";
import { joinStream } from "./join.controller";
import { userLeaderboard } from "./leaderboard.controller";
import { updateThumbnail } from "./thumbnail.controller";

export const streams = Router();

streams
    .get("/feed", publicFeedContent)
    .get("/leaderboard", userLeaderboard)
    .patch("/:id/end", privyAuth, endStream)
    .post("/:id/join", joinStream)
    .post("/:id/thumbnail", privyAuth, upload.single("thumbnail"), updateThumbnail)
    .post("/create", privyAuth, createStream);
