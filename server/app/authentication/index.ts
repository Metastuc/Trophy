import { Router } from "express";

import { upload } from "#middleware/multer.ts";
import { privyAuth } from "#middleware/privy-auth.ts";

import { onBoard } from "./onboard";
import { user } from "./user";

export const authentication = Router();

authentication.get("/user", privyAuth, user).post("/onboard", privyAuth, upload.single("profilePicture"), onBoard);
