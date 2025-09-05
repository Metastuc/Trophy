import fs from "fs";
import path from "path";
import pino from "pino";
import * as rfs from "rotating-file-stream";

import { SERVER_ENV } from "#config/settings.ts";

import { getCwd } from "./get-cwd";

const { rootDir } = getCwd(import.meta.url);
const logDir = path.join(rootDir, "logs");

if (SERVER_ENV.ENVIRONMENT !== "development") {
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
        level: SERVER_ENV.ENVIRONMENT === "development" ? "debug" : "info",

        transport:
            SERVER_ENV.ENVIRONMENT === "development"
                ? { target: "pino-pretty", options: { colorize: true } }
                : undefined,
    },

    SERVER_ENV.ENVIRONMENT === "development" ? process.stdout : stream,
);
