import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { followUser } from "./follow.controller";
import { followStatus } from "./status.controller";
import { unfollowUser } from "./unfollow.controller";

export const follow = Router();

follow
    .post("/:userId/subscribe", privyAuth, followUser)
    .delete("/:userId/unsubscribe", privyAuth, unfollowUser)
    .get("/:userId/status", privyAuth, followStatus);
