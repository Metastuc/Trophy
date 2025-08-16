import { type Request, type Response } from "express";
import { User } from "../models/userSchema";
import { prisma } from "../config/db";

export const authUser = async (req: Request, res: Response) => {
  const privyId = req.privyUser?.userId;

  try {
    const user = await prisma.user.findUnique({ where: { privyId } });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        isBasicProfileComplete: Boolean(user?.email && user?.userPfp && user?.username),
        user: {
          bio: user?.bio,
          email: user?.email,
          profilePicture: user?.userPfp,
          username: user?.username,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
      message: "Failed to authenticate user",
    });
  }
};
