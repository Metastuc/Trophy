import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env.local", quiet: true });

export const APP_SETTINGS = z
    .object({
        SERVER_URL: z.url(),

        CLIENT_URL: z.url(),

        ENVIRONMENT: z.enum(["development", "production", "staging"]),

        PORT: z.coerce.number().int().positive(),
    })
    .parse(process.env);
