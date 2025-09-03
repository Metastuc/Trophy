import { Router } from "express";

import { publicFeedContent } from "./feed.controller";

export const streams = Router();

streams.get("/feed", publicFeedContent);
