import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { saveCreatorToken } from "./save";
import { createTokenUri } from "./uri";

export const token = Router();

token
    .patch("/:userId/save-creator-token", privyAuth, saveCreatorToken)
    .post("/:userId/create-token-uri", privyAuth, createTokenUri);
