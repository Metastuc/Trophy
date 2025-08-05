import * as dotenv from "dotenv";
dotenv.config();

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
export const AWS_REGION = process.env.AWS_REGION!;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET!;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;
export const CLIENT_URL = process.env.ENVIRONMENT === "development" ? "localhost:5173" : "https://trophystream.xyz";
export const DB_URI = process.env.DB_URI!;
export const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE!;
export const ENVIRONMENT = process.env.ENVIRONMENT;
export const EMAIL_PASSWORD = process.env.EMAIL_USER!;
export const EMAIL_SERVICE = process.env.EMAIL_SERVICE!;
export const EMAIL_USER = process.env.EMAIL_USER!;
export const FIRESTORE_CRED = process.env.FIRESTORE_CRED;
export const HUDDLE_API_KEY = process.env.HUDDLE_API_KEY!;
export const HUDDLE_PROJECT_ID = process.env.HUDDLE_PROJECT_ID!;
export const LIVEPEER_API_KEY = process.env.LIVEPEER_API_KEY!;
export const PORT = process.env.PORT || 4500;
export const CORS_ORIGINS =
  ENVIRONMENT === "development" ? "http://localhost:5173" : process.env.CORS_ORIGINS!.split(",");
export const PRIVY_APP_ID = process.env.PRIVY_APP_ID!;
export const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET!;
export const PRIVY_KEY = process.env.PRIVY_KEY!.replace(/\\n/g, "\n");
export const REDIS_URI = process.env.REDIS_URI!;
export const REDIS_PORT = process.env.REDIS_PORT!;
export const REDIS_USERNAME = process.env.REDIS_USERNAME!;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD!;
