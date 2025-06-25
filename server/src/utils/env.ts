import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4500;

export const FIRESTORE_CRED = process.env.FIRESTORE_CRED;

export const HUDDLE_API_KEY = process.env.HUDDLE_API_KEY!;

export const HUDDLE_PROJECT_ID = process.env.HUDDLE_PROJECT_ID!;

export const EMAIL_USER = process.env.EMAIL_USER!;

export const EMAIL_SERVICE = process.env.EMAIL_SERVICE!;

export const EMAIL_PASSWORD = process.env.EMAIL_USER!;

export const DB_URI = process.env.DB_URI!;

export const CLIENT_URL = "https://trophystream.xyz";

export const PRIVY_APP_ID = process.env.PRIVY_APP_ID!;

export const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET!;

export const PRIVY_KEY = process.env.PRIVY_KEY!.replace(/\\n/g, "\n");

export const AWS_REGION = process.env.AWS_REGION!;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;

export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;

export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET!;

export const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE!;