import { Router } from "express";

import { getTokenPrice } from "#services/get-token-price.ts";

import { authentication } from "./services/authentication";
import { streams } from "./services/streams";
import { follow } from "./services/subscription";
import { tips } from "./services/tips";
import { user } from "./services/user";

export const routes = Router();

routes
    .get("/get-token-price", getTokenPrice)
    .use("/authentication", authentication)
    .use("/follow", follow)
    .use("/streams", streams)
    .use("/tips", tips)
    .use("/user", user);
