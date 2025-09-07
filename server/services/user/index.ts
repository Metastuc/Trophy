import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { profile } from "./profile.controller";
import { saveCreatorToken } from "./save-creator-token.controller";

export const user = Router();

user.patch("/:userId/save-creator-token", privyAuth, saveCreatorToken)
    .get("/:userId/profile", profile)
    .get("/me", privyAuth, profile);
