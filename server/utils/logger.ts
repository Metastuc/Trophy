import fs from "fs";
import path from "path";
import pino from "pino";
import * as rfs from "rotating-file-stream";

import { APP_SETTINGS } from "#config/settings.ts";

import { getCwd } from "./get-cwd";

const { rootDir } = getCwd(import.meta.url);
const logDir = path.join(rootDir, "logs");

if (APP_SETTINGS.ENVIRONMENT !== "development") {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
}

const stream = rfs.createStream("app.log", {
    size: "10M",
    maxFiles: 5,
    path: logDir,
    compress: "gzip",
});

export const logger = pino(
    {
        level: APP_SETTINGS.ENVIRONMENT === "development" ? "debug" : "info",

        transport:
            APP_SETTINGS.ENVIRONMENT === "development"
                ? { target: "pino-pretty", options: { colorize: true } }
                : undefined,
    },

    APP_SETTINGS.ENVIRONMENT === "development" ? process.stdout : stream,
);
