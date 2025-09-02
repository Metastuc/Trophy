import fs from "fs";
import path from "path";
import pino from "pino";
import SonicBoom from "sonic-boom";

import { APP_SETTINGS } from "#config/settings.ts";

import { getCwd } from "./get-cwd";

const { dirname } = getCwd(import.meta.url);
const logDir = path.join(dirname, "logs");

if (APP_SETTINGS.ENVIRONMENT !== "development") {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
}

export const logger = pino(
    {
        level: APP_SETTINGS.ENVIRONMENT === "development" ? "debug" : "info",

        transport:
            APP_SETTINGS.ENVIRONMENT === "development"
                ? { target: "pino-pretty", options: { colorize: true } }
                : undefined,
    },

    APP_SETTINGS.ENVIRONMENT === "development"
        ? process.stdout
        : new SonicBoom({ dest: path.join(logDir, "app.log"), append: true }),
);
