import dotenv from "dotenv";
import isValidHost from "is-valid-host";
import { z } from "zod";

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
        PORT: z.coerce.number().int().positive(),
        PRIVY_APP_ID: z.string(),
        PRIVY_APP_SECRET: z.string(),
        PRIVY_KEY: z.string().transform((value) => value.replace(/\\n/g, "\n")),
    })
    .parse(process.env);

export const SERVER_CONSTANTS = {
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024,
};
