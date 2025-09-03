import { Router } from "express";

import { authentication } from "./services/authentication";

export const routes = Router();

routes.use("/authentication", authentication);
