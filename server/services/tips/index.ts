import { Router } from "express";

import { storeTip } from "./store-tip";

export const tips = Router();

tips.post("/store", storeTip);
