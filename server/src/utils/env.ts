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
