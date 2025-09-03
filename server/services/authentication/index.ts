import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

import { user } from "./user.controller";

export const authentication = Router();

authentication.get("/user", privyAuth, user);
// .post("/onboard");
