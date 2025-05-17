import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4500;
export const FIRESTORE_CRED = process.env.FIRESTORE_CRED;
export const HUDDLE_KEY = process.env.HUDDLE_API_KEY || "key";