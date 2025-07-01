import { Request, Response } from "express";
import { User } from "../models/userSchema";

export async function onboard(request: Request, response: Response) {
  const privyId = request.privyUser?.userId;
  const userPfp = (request.file as any)?.location;

  try {
    const { bio, email, username } = request.body;
    const existingUser = await User.findOne({ privyId });

    if (!existingUser) {
      if (!username) {
        response.status(422).json({ message: "username is required" });
        return;
      }

      const user = await User.create({ bio, email, username, userPfp });
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
