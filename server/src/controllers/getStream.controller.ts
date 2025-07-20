import type { Request, Response } from "express";
import { Stream } from "../models/streamSchema";
import { User } from "../models/userSchema";

export const getStream = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const stream = await Stream.findOne({ roomId });

    if (!stream) {
      res.status(400).json({ message: "Invalid roomId" });
      return;
    }

    const user = await User.findOne({ username: stream.streamer });
    if (!user) {
      res.status(400).json({ message: "Invalid streamer" });
      return;
    }

    res.status(200).json({
      title: stream.title,
      streamer: stream.streamer,
      creatorToken: user.creatorToken,
      creatorAddress: user.walletAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to get stream",
    });
  }
};
