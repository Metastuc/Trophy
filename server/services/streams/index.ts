import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { createStream } from "./create.controller";
import { publicFeedContent } from "./feed.controller";
import { joinStream } from "./join.controller";

export const streams = Router();

streams.get("/feed", publicFeedContent).post("/create", privyAuth, createStream).post("/:id/join", joinStream);
