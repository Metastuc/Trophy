import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { sendRegisterEmail } from "../utils/emailNotis";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { userPfp, username, email, privyId, bio } = req.body;

    if (!privyId) {
      res.status(400).json({
        message: "privyId is required",
      });
      return;
    }

    const checkUser = await User.findOne({ privyId });

    if (!checkUser) {
      if (!userPfp || !username || !email) {
        res.status(400).json({
          status: "error",
          message: "userPfp, username, and email are required",
        });
        return;
      }

      const user = await User.create({ privyId, userPfp, username, email, bio });
      // await sendRegisterEmail({ email, username }, "Welcome to Trophy 🎉");

      res.status(201).json({
        data: {
          isBasicProfileComplete: true,
          user
        },
      });
      return;
    }

    res.status(200).json({
      user: checkUser
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to authenticate user",
    });
  }
};
