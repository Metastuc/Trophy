import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env.local" });

export const APP_SETTINGS = z
    .object({
        SERVER_URL: z.url(),

        // APP_TITLE: z.string(),

        CLIENT_URL: z.url(),

        ENVIRONMENT: z.enum(["development", "production", "staging"]),

        PORT: z.coerce.number().int().positive(),
    })
    .parse(process.env);
