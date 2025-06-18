import { type Request, type Response } from "express";
import { User } from "../models/userSchema";

export const authUser = async (req: Request, res: Response) => {
  let _user;

  try {
    const { privyId } = req.body;

    if (!privyId) {
      res.status(400).json({
        status: "error",
        message: "privyId is required",
      });
      return;
    }

    _user = await User.findOne({ privyId });

    if (!_user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        isBasicProfileComplete: !!(_user?.email && _user?.userPfp && _user?.username),
      },
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to authenticate user",
      error: (error as Error).message,
    });
    return;
  }
};
