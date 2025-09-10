import { Router } from "express";

import { getTokenPrice } from "#services/get-token-price.ts";

import { authentication } from "./services/authentication";
import { streams } from "./services/streams";
import { tips } from "./services/tips";
import { user } from "./services/user";

export const routes = Router();

routes
    .use("/authentication", authentication)
    .use("/streams", streams)
    .use("/user", user)
    .use("/tips", tips)
    .get("/get-token-price", getTokenPrice);
