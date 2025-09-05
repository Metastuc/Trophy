import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { saveCreatorToken } from "./save-creator-token.controller";

export const user = Router();

user.patch("/:userId/save-creator-token", privyAuth, saveCreatorToken);
