import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Stream } from "../models/streamSchema.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({
        message: "username is required",
      });
      return;
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

    res.status(200).json({
      message: "User data retrieved successfully",
      user,
      streams,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to get user data",
    });
  }
};
