import fs from "fs";
import path from "path";
import pino from "pino";
import * as rfs from "rotating-file-stream";

import { SERVER_ENV } from "#config/constants.ts";

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

const rid = (): string => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const safe = (v: unknown): string => {
    try {
        return JSON.stringify(v);
    } catch {
        return String(v);
    }
};

interface LogInput {
    module?: string;
    tag?: string;
    id?: string;
    msg?: string;
    data?: unknown;
}

function format({ module, tag, id = rid(), msg, data }: LogInput): string {
    return `[${module ?? "app"}][${tag ?? "log"}][${id}] ${msg ?? ""}` + (data !== undefined ? " :: " + safe(data) : "");
}

function baseLog(input: LogInput): void {
    console.log("\n" + format(input) + "\n");
}

baseLog.info = (input: LogInput): void => {
    console.log("\n" + format({ ...input, tag: input.tag ?? "info" }) + "\n");
};

baseLog.error = (input: LogInput): void => {
    console.error("\n" + format({ ...input, tag: input.tag ?? "error" }) + "\n");
};

baseLog.warn = (input: LogInput): void => {
    console.warn("\n" + format({ ...input, tag: input.tag ?? "warn" }) + "\n");
};

baseLog.debug = (input: LogInput): void => {
    console.debug("\n" + format({ ...input, tag: input.tag ?? "debug" }) + "\n");
};

export const log = baseLog as typeof baseLog & {
    info: (input: LogInput) => void;
    error: (input: LogInput) => void;
    warn: (input: LogInput) => void;
    debug: (input: LogInput) => void;
};
