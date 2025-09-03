import { Router } from "express";

import { privyAuth } from "#middleware/privy-auth.ts";

export const user = Router();

user.get("/user", privyAuth).post("/onboard");
