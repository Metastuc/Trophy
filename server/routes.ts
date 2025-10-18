import { Router } from "express";

import { getEthPrice, getTokenPrice } from "#app/get-prices.ts";

import { authentication } from "./app/authentication";
import { streams } from "./app/streams";
import { follow } from "./app/subscription";
import { token } from "./app/token";
import { transactions } from "./app/transaction";
import { user } from "./app/user";

export const routes = Router();

routes
    .get("/get-token-price", getTokenPrice)
    .get("/get-eth-price", getEthPrice)
    .use("/authentication", authentication)
    .use("/follow", follow)
    .use("/streams", streams)
    .use("/token", token)
    .use("/transactions", transactions)
    .use("/user", user);
