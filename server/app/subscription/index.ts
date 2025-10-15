import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { followUser } from "./follow";
import { followStatus } from "./status";
import { unfollowUser } from "./unfollow";

export const follow = Router();

follow
    .post("/:userId/subscribe", privyAuth, followUser)
    .delete("/:userId/unsubscribe", privyAuth, unfollowUser)
    .get("/:userId/status", privyAuth, followStatus);
