import { Router } from "express";

import { upload } from "#middleware/multer.ts";
import { privyAuth } from "#middleware/privy-auth.ts";

import { notifications } from "./notifications";
import { markNotificationsAsRead } from "./notifications-read";
import { profile } from "./profile";
import { getWalletTokenBalances } from "./token-balances";
import { updateUserProfile } from "./update";

export const user = Router();

user.get("/:userId/notifications", privyAuth, notifications)
    .get("/:userId/profile", profile)
    .get("/:userId/wallet-token-balances", privyAuth, getWalletTokenBalances)
    .get("/me", privyAuth, profile)
    .patch("/:userId/notifications/read", privyAuth, markNotificationsAsRead)
    .patch("/:userId/update", privyAuth, upload.single("profilePicture"), updateUserProfile);
