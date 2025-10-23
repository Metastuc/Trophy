import { Router } from "express";

import { purchaseTransaction } from "./purchase";
import { tipTransaction } from "./tip";

export const transactions = Router();

transactions.post("/purchase", purchaseTransaction).post("/tip", tipTransaction);
