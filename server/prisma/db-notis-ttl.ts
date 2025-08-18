import { MongoClient } from "mongodb";
import { DB_URI } from "../src/utils/env";

async function main() {
  const client = new MongoClient(DB_URI);
  await client.connect();

  const db = client.db();
  const collection = db.collection("notifications");

  try {
    await collection.dropIndex("followedAt_ttl");
    console.log("Dropped existing normal index: followedAt_ttl");
  } catch (err: any) {
    if (err.codeName !== "IndexNotFound") throw err;
  }

  await collection.createIndex(
    { followedAt: 1 },
    { name: "followedAt_ttl", expireAfterSeconds: 60 * 60 * 24 * 7 }, // 7 days
  );

  console.log("✅ TTL index created on notifications.followedAt");
  await client.close();
}

main().catch((err) => {
  console.error("Error creating TTL index:", err);
  process.exit(1);
});
