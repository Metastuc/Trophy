import { type Request, type Response } from "express";
import { User } from "../models/userSchema";

export const authUser = async (req: Request, res: Response) => {
  try {
    const { privyId } = req.body;

    if (!privyId) {
      res.status(403).json({
        status: "error",
        message: "privyId is required",
      });
    }

    const user = await User.findOne({ privyId });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        isBasicProfileComplete: Boolean(user?.email && user?.userPfp && user?.username),
        user: {
          email: user?.email,
          username: user?.username,
        },
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to authenticate user",
      error: (error as Error).message,
    });
  }
};
