import dotenv from "dotenv";
import isValidHost from "is-valid-host";
import { z } from "zod";

dotenv.config({ path: ".env.local", quiet: true });

export const APP_SETTINGS = z
    .object({
        CLIENT_URL: z.url(),
        EMAIL_HOST: z.string().refine((value) => isValidHost(value), { message: "Invalid host" }),
        EMAIL_PASSWORD: z.string(),
        EMAIL_PORT: z.coerce.number().int().positive(),
        EMAIL_USER: z.string(),
        ENVIRONMENT: z.enum(["development", "production", "staging"]),
        HUDDLE_API_KEY: z.string(),
        HUDDLE_PROJECT_ID: z.string(),
        PORT: z.coerce.number().int().positive(),
        PRIVY_APP_ID: z.string(),
        PRIVY_APP_SECRET: z.string(),
        PRIVY_KEY: z.string().transform((value) => value.replace(/\\n/g, "\n")),
    })
    .parse(process.env);
