import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { createStream } from "./create.controller";
import { publicFeedContent } from "./feed.controller";
import { joinStream } from "./join.controller";
import { userLeaderboard } from "./leaderboard.controller";

export const streams = Router();

streams
    .get("/feed", publicFeedContent)
    .get("/leaderboard", userLeaderboard)
    .post("/:id/join", joinStream)
    .post("/create", privyAuth, createStream);
