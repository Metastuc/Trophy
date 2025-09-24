import { Router } from "express";

import { user } from "#app/authentication/user.controller.ts";
import { getTokenPrice } from "#app/get-token-price.ts";

import { authentication } from "./app/authentication";
import { streams } from "./app/streams";
import { follow } from "./app/subscription";
import { tips } from "./app/tips";

export const routes = Router();

routes
    .get("/get-token-price", getTokenPrice)
    .use("/authentication", authentication)
    .use("/follow", follow)
    .use("/streams", streams)
    .use("/tips", tips)
    .use("/user", user);
