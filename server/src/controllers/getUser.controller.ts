import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Stream } from "../models/streamSchema";
import { RedisClient } from "../config/db";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({
        message: "username is required",
      });
      return;
    }

    const userCache = await RedisClient.get(`user:${username}`);
    const streamCache = await RedisClient.get(`stream:${username}`);
    if (userCache && streamCache) {
      const userProp = JSON.parse(userCache);

      res.status(200).json({
        user: userProp,
        streams: streamCache ? JSON.parse(streamCache) : [],
      });

      return
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const streams = await Stream.find({
      streamer: username,
      status: "Scheduled",
    }).sort({ _id: -1 });

    await RedisClient.set(`user:${username}`, JSON.stringify(user));
    await RedisClient.set(`stream:${username}`, JSON.stringify(streams));

    res.status(200).json({
      message: "User data retrieved successfully",
      user,
      streams,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to get user data",
    });
  }
};
