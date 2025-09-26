import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { notifications } from "./notifications.controller";
import { markNotificationsAsRead } from "./notifications-read.controller";
import { profile } from "./profile.controller";
import { saveCreatorToken } from "./save-creator-token.controller";
import { getWalletTokenBalances } from "./token-balances.controller";

export const user = Router();

user.get("/:userId/notifications", privyAuth, notifications)
    .get("/:userId/profile", profile)
    .get("/:userId/wallet-token-balances", privyAuth, getWalletTokenBalances)
    .get("/me", privyAuth, profile)
    .patch("/:userId/save-creator-token", privyAuth, saveCreatorToken)
    .patch("/:userId/notifications/read", privyAuth, markNotificationsAsRead);
