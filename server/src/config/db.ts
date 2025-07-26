import mongoose from "mongoose";
import { DB_URI, REDIS_PASSWORD, REDIS_PORT, REDIS_URI, REDIS_USERNAME } from "../utils/env";
import { createClient, type RedisClientType } from "redis";

// General container
const DB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`\x1b[36m%s\x1b[0m`, `DB: MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`\x1b[31m%s\x1b[0m`, `DB: MongoDB Connection Failure: ${error.message}`);
    process.exit(1);
  }
};

let redisClient: RedisClientType | null;

export const getRedisClient = async () => {
  
  if (redisClient) return redisClient;

  redisClient = createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    socket: {
      host: REDIS_URI,
      port: Number(REDIS_PORT),
    }
  });

  redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
    return
  });

  await redisClient.connect();

  return redisClient;
}

export const RedisClient = await getRedisClient();

export default DB;
