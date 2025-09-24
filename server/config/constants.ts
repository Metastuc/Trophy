import dotenv from "dotenv";
import isValidHost from "is-valid-host";
import { base, baseSepolia } from "viem/chains";
import { z } from "zod";

import { toTime } from "#~/utils/time.ts";

dotenv.config({ path: ".env.local", quiet: true });

export const SERVER_ENV = z
    .object({
        AWS_ACCESS_KEY_ID: z.string(),
        AWS_REGION: z.string(),
        AWS_S3_BUCKET: z.string(),
        AWS_SECRET_ACCESS_KEY: z.string(),
        CLIENT_URL: z.url(),
        EMAIL_HOST: z.string().refine((value) => isValidHost(value), { message: "Invalid host" }),
        EMAIL_PASSWORD: z.string(),
        EMAIL_PORT: z.coerce.number().int().positive(),
        EMAIL_USER: z.string(),
        ENVIRONMENT: z.enum(["development", "production", "staging"]),
        HUDDLE_API_KEY: z.string(),
        HUDDLE_PROJECT_ID: z.string(),
        MORALIS_API_KEY: z.string(),
        PORT: z.coerce.number().int().positive(),
        PRIVY_APP_ID: z.string(),
        PRIVY_APP_SECRET: z.string(),
        PRIVY_KEY: z.string().transform((value) => value.replace(/\\n/g, "\n")),
        REDIS_PASSWORD: z.string(),
        REDIS_PORT: z.coerce.number().int().positive(),
        REDIS_URI: z.string().refine((value) => isValidHost(value), { message: "Invalid host" }),
        REDIS_USERNAME: z.string(),
    })
    .parse(process.env);

export const SERVER_CONSTANTS = {
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024,

    MAX_STREAM_GUESTS: 4,

    REDIS_KEYS: {
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
