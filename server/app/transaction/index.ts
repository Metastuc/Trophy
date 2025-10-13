import { Router } from "express";

import { tipTransaction } from "./tip";

export const transactions = Router();

transactions.post("/tip", tipTransaction);
