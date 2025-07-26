import type { Request, Response } from "express";
import { Stream } from "../models/streamSchema";
import { User } from "../models/userSchema";
import { RedisClient } from "../config/db";

export const getStream = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const stream = await Stream.findOne({ roomId });

    if (!stream) {
      res.status(400).json({ error: "Invalid roomId" });
      return;
    }

    const user = await User.findOne({ username: stream.streamer });
    if (!user) {
      res.status(400).json({ error: "Invalid streamer" });
      return;
    }

    const streamCache = await RedisClient.get(`stream:${roomId}`);

    if (streamCache) {
      const streamObjs = JSON.parse(streamCache);
      res.status(200).json({
        title: streamObjs.title,
        streamer: streamObjs.streamer,
        creatorToken: streamObjs.creatorToken,
        creatorAddress: streamObjs.creatorAddress,
        pfp: streamObjs.userPfp,
      });
      return;
    } else {
      await RedisClient.set(`stream:${roomId}`, JSON.stringify(stream));
    }

    res.status(200).json({
      title: stream.title,
      streamer: stream.streamer,
      creatorToken: user.creatorToken,
      creatorAddress: user.walletAddress,
      pfp: user.userPfp,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
};
