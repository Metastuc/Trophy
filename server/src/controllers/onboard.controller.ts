import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { RedisClient } from "../config/db";
import cryptoRandomString from "crypto-random-string";

export async function onboard(request: Request, response: Response) {
  let userPfp = (request.file as any)?.location;
  const privyId = request.privyUser?.userId;

  try {
    const { bio, email, username, profilePicture, walletAddress } = request.body;
    const existingUser = await User.findOne({ privyId });

    if (!userPfp && profilePicture) {
      userPfp = profilePicture;
    }

    if (!existingUser) {
      if (!username) {
        response.status(422).json({ message: "username is required" });
        return;
      }

      const randString = cryptoRandomString({ length: 8, type: "alphanumeric" });

      const streamKey = `trophy:${randString}`;

      const user = await User.create({ bio, email, privyId, username, userPfp, walletAddress, streamKey });

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
