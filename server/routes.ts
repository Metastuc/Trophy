import { Router } from "express";

import { authentication } from "./services/authentication";
import { streams } from "./services/streams";

export const routes = Router();

routes.use("/authentication", authentication).use("/streams", streams);
