import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { RedisClient } from "../config/db";
import { savePfp } from "../utils/imgs";

export async function onboard(request: Request, response: Response) {
  const userProfilePicture = request.file?.buffer;
  const privyId = request.privyUser?.userId;

  try {
    const { bio, email, username, profilePicture, walletAddress } = request.body;
    const existingUser = await User.findOne({ privyId });

    if (!existingUser) {
      if (!username) {
        response.status(422).json({ message: "username is required" });
        return;
      }

      let userPfp = "";

      if (userProfilePicture) {
        userPfp = await savePfp(userProfilePicture, request.file!.originalname);
      } else {
        userPfp = profilePicture;
      }

      const user = await User.create({ bio, email, privyId, username, userPfp, walletAddress });

      await RedisClient.set(`user:${user.username}`, JSON.stringify(user));

      response.status(201).json({
        message: "success",
        data: { isBasicProfileComplete: Boolean(user?.email && user?.userPfp && user?.username) },
      });
    }
  } catch (error) {
    response.status(500).json({
      error: (error as Error).message,
      message: "Failed to authenticate user",
    });
  }
}
