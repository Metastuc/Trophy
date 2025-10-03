import Redis from "ioredis";

import { log } from "#~/utils/logger.ts";

import { SERVER_ENV } from "./constants";

let redis: Redis;

if (SERVER_ENV.ENVIRONMENT === "production")
    redis = new Redis(SERVER_ENV.UPSTASH_REDIS, { maxRetriesPerRequest: null });
else
    redis = new Redis({
        host: SERVER_ENV.REDIS_URI,
        maxRetriesPerRequest: null,
        password: SERVER_ENV.REDIS_PASSWORD,
        port: SERVER_ENV.REDIS_PORT,
        username: SERVER_ENV.REDIS_USERNAME,
    });

redis.on("connect", () => {
    log({ module: "REDIS", msg: "🔌 Redis connected" });
});

redis.on("ready", () => {
    log.info({ module: "REDIS", msg: "✅ Redis ready" });
});

redis.on("error", (error) => {
    log.error({ module: "REDIS", msg: "❌ Redis error", data: error });
});

redis.on("end", () => {
    log.warn({ module: "REDIS", msg: "⚠️ Redis connection closed" });
});

redis.on("reconnecting", (time: number) => {
    log.warn({ module: "REDIS", msg: `♻️ Redis reconnecting in ${time}ms` });
});

export { redis };
