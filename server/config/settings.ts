import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env.local", quiet: true });

export const APP_SETTINGS = z
    .object({
        CLIENT_URL: z.url(),
        ENVIRONMENT: z.enum(["development", "production", "staging"]),
        HUDDLE_API_KEY: z.string(),
        HUDDLE_PROJECT_ID: z.string(),
        PORT: z.coerce.number().int().positive(),
        PRIVY_APP_ID: z.string(),
        PRIVY_APP_SECRET: z.string(),
        PRIVY_KEY: z.string().transform((value) => value.replace(/\\n/g, "\n")),
    })
    .parse(process.env);
