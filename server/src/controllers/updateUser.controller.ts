import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Stream } from "../models/streamSchema";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { username, bio, xUrl, YTUrl } = req.body;

    if (!username || typeof username !== "string") {
      res.status(400).json({ message: "Invalid username" });
      return;
    }

    const user = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          bio,
          xUrl,
          YTUrl,
        },
      },
      { new: true },
    );

    const streams = await Stream.find({
      streamer: username,
      status: "Scheduled",
    });

    res.status(200).json({
      status: "success",
      user,
      streams,
    });
    return;
  } catch (error) {
    console.error("Error in update Profile:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to update profile data",
    });
    return;
  }
};

export const feesUpdate = async (req: Request, res: Response) => {
  try {
    const { username, fees } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "user not found :(" });
      return;
    }

    user.totalFees += fees;
    await user.save();

    res.status(200).json({ message: "fees updated :)" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
