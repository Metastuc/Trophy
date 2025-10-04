import dotenv from "dotenv";
import isValidHost from "is-valid-host";
import { base, baseSepolia } from "viem/chains";
import { z } from "zod";

import { toTime } from "#~/utils/time.ts";

dotenv.config({ path: ".env.local", quiet: true });

export const SERVER_ENV = z
    .object({
        ALLOWED_ORIGINS: z
            .string()
            .transform((value) => value.split(",").map((origin) => origin.trim()))
            .refine(
                (urls) =>
                    urls.every((url) => {
                        try {
                            new URL(url);
                            return true;
                        } catch {
                            return false;
                        }
                    }),
                { message: "One or more ALLOWED_ORIGINS are invalid URLs" },
            ),
        AWS_ACCESS_KEY_ID: z.string(),
        AWS_REGION: z.string(),
        AWS_S3_BUCKET: z.string(),
        AWS_SECRET_ACCESS_KEY: z.string(),
        CLIENT_URL: z.url(),
        COOLIFY_REDIS: z.url(),
        EMAIL_HOST: z.string().refine((value) => isValidHost(value), { message: "Invalid host" }),
        EMAIL_PASSWORD: z.string(),
        EMAIL_PORT: z.coerce.number().int().positive(),
        EMAIL_USER: z.string(),
        ENVIRONMENT: z.enum(["development", "production", "staging"]),
        HUDDLE_API_KEY: z.string(),
        HUDDLE_PROJECT_ID: z.string(),
        JPG_DEFAULT_IMAGE: z.url(),
        MORALIS_API_KEY: z.string(),
        PINATA_GATEWAY: z.string().refine((value) => isValidHost(value), { message: "Invalid host" }),
        PINATA_JWT: z.string(),
        PORT: z.coerce.number().int().positive(),
        PRIVY_APP_ID: z.string(),
        PRIVY_APP_SECRET: z.string(),
        PRIVY_KEY: z.string().transform((value) => value.replace(/\\n/g, "\n")),
        REDIS_PASSWORD: z.string(),
        REDIS_PORT: z.coerce.number().int().positive(),
        REDIS_URI: z.string().refine((value) => isValidHost(value), { message: "Invalid host" }),
        REDIS_USERNAME: z.string(),
        VITE_DEFAULT_IMAGE: z.url(),
    })
    .parse(process.env);

export const SERVER_CONSTANTS = {
    MAX_STREAM_GUESTS: 4,

    REDIS_KEYS: {
        FEED: {
            PUBLIC: {
                key: "feed:public",
                ttl: toTime({ unit: "minutes", value: 1 }),
            },

            PRIVATE: {
                key: "feed:private",
                ttl: toTime({ unit: "minutes", value: 1 }),
            },
        },

        NOTIFICATIONS: {
            KEY: (userId: string) => `user:notifications:${userId}`,
            TTL: toTime({ unit: "seconds", value: 60 }),
        },

        USER_PROFILE: {
            KEY: ({ id, isUser }: { id: string; isUser: boolean }) =>
                isUser ? `user:public:${id}` : `user:private:${id}`,
            TTL: toTime({ unit: "hours", value: 6 }),
        },

        TOKEN_PRICE: {
            KEY: (id: string) => `token:price:${id}`,
            TTL: toTime({ unit: "minutes", value: 5 }),
        },

        ROOM: {
            KEY: (id: string) => `room:${id}`,
            TTL: toTime({ unit: "days", value: 7 }),
        },

        WALLET_BALANCES: {
            KEY: (id: string) => `user:wallet:balances:${id}`,
            TTL: toTime({ unit: "minutes", value: 1 }),
        },
    },

    CURRENT_NETWORK: SERVER_ENV.ENVIRONMENT === "production" ? base : baseSepolia,
};
