import { FIRESTORE_CRED } from "./env.js";
import admin from 'firebase-admin';

if (!FIRESTORE_CRED) {
  throw new Error("FIRESTORE_CRED is not defined.");
}

const CREDENTIALS = JSON.parse(
  Buffer.from(FIRESTORE_CRED, 'base64').toString('utf-8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(CREDENTIALS),
  });
}

export const db = admin.firestore();