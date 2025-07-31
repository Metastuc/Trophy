import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Stream } from "../models/streamSchema";
import { DEFAULT_IMAGE } from "../utils/env";
import { deletePfp } from "../utils/pfp";
import { RedisClient } from "../config/db";

export const updateProfile = async (req: Request, res: Response) => {
  const privyId = req.privyUser?.userId;

  const updateFields: Record<string, string> = {};
  const fieldMap: Record<string, string> = {
    email: "email",
    bio: "bio",
    xUrl: "xUrl",
    YTUrl: "YTUrl",
    username: "username",
    profilePicture: "userPfp",
  };

  try {
    for (const [clientField, dbField] of Object.entries(fieldMap)) {
      const value = req.body[clientField];
      if (typeof value === "string" && value.trim() !== "") {
        updateFields[dbField] = value.trim();
      }
    }

    if (Object.keys(updateFields).length === 0) {
      res.status(422).json({ message: "No valid fields provided for update." });
      return;
    }

    const user = await User.findOneAndUpdate({ privyId }, { $set: updateFields }, { new: true });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    const streams = await Stream.find({
      streamer: user.username,
      status: "Scheduled"
    }).sort({ _id: -1 });

    await RedisClient.set(`user:${user.username}`, JSON.stringify(user));
    await RedisClient.set(`stream:${user.username}`, JSON.stringify(streams));

    res.status(200).json({ message: "profile update success", user, streams });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to update profile data",
    });
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

    await RedisClient.set(`user:${user.username}`, JSON.stringify(user));

    res.status(200).json({ message: "fees updated :)" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePfp = async (req: Request, res: Response) => {
  try {
    const imageToUpdate = (req.file as any)?.location;
    const privyId = req.privyUser;

    const user = await User.findOne({ privyId });

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    if (user.userPfp !== DEFAULT_IMAGE) {
      await deletePfp(user.userPfp);
    }

    user.userPfp = imageToUpdate;
    await user.save();

    await RedisClient.set(`user:${user.username}`, JSON.stringify(user));

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};
