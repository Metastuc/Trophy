import { Router } from "express";

import { upload } from "#middleware/multer.ts";
import { privyAuth } from "#middleware/privy-auth.ts";

import { createStream } from "./create";
import { endStream } from "./end";
import { publicFeedContent } from "./feed";
import { joinStream } from "./join";
import { userLeaderboard } from "./leaderboard";
import { updateThumbnail } from "./thumbnail";

export const streams = Router();

streams
    .get("/feed", publicFeedContent)
    .get("/leaderboard", userLeaderboard)
    .patch("/:id/end", privyAuth, endStream)
    .post("/:id/join", joinStream)
    .post("/:id/thumbnail", privyAuth, upload.single("thumbnail"), updateThumbnail)
    .post("/create", privyAuth, createStream);
