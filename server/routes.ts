import { Router } from "express";

import { authentication } from "./services/authentication";
import { streams } from "./services/streams";
import { user } from "./services/user";

export const routes = Router();

routes.use("/authentication", authentication).use("/streams", streams).use("/user", user);
