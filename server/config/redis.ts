import Redis from "ioredis";

import { log } from "#~/utils/logger.ts";

import { SERVER_ENV } from "./constants";

export const redis = new Redis({
    host: SERVER_ENV.REDIS_URI,
    maxRetriesPerRequest: null,
    password: SERVER_ENV.REDIS_PASSWORD,
    port: SERVER_ENV.REDIS_PORT,
    username: SERVER_ENV.REDIS_USERNAME,
});

redis.on("connect", () => {
    log({ module: "redis", msg: "🔌 Redis connected" });
});

redis.on("ready", () => {
    log.info({ module: "redis", msg: "✅ Redis ready" });
});

redis.on("error", (err) => {
    log.error({ module: "redis", msg: "❌ Redis error", data: err });
});

redis.on("end", () => {
    log.warn({ module: "redis", msg: "⚠️ Redis connection closed" });
});

redis.on("reconnecting", (time: number) => {
    log.warn({ module: "redis", msg: `♻️ Redis reconnecting in ${time}ms` });
});
