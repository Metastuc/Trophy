import { Request, Response } from "express";
import { RedisClient, prisma } from "../config/db";
import { savePfp } from "../utils/imgs";
import { sendRegisterEmail } from "../utils/emailNotis";

export async function onboard(request: Request, response: Response) {
  const userProfilePicture = request.file?.buffer;
  const privyId = request.privyUser?.userId as string;

  try {
    const { bio, email, username, profilePicture, walletAddress, fc } = request.body;
    const existingUser = await prisma.user.findUnique({ where: { privyId } });

    if (!existingUser) {
      if (!username) {
        response.status(422).json({ message: "username is required" });
        return;
      }

      let usernameRegex = "";
      const formatRegex = /[ _-]/g;
      const usernameFormat = formatRegex.test(username);

      if (fc) {
        usernameRegex = username.replace(formatRegex, "");
      } else {
        if (usernameFormat) {
          response.status(400).json({ message: "username cannot have space, underscore or hypens" });
          return;
        }

        if (username === "jessepollak") {
          response.status(400).json({ message: "username cannot be jessepollak" });
          return;
        }

        usernameRegex = username;
      }

      const usernameExists = await prisma.user.findUnique({ where: { username: usernameRegex } });
      if (usernameExists) {
        response.status(400).json({ message: "username exists" });
        return;
      }

      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
        response.status(400).json({ message: "email exists" });
        return;
      }

      let userPfp;

      if (userProfilePicture) {
        userPfp = await savePfp(userProfilePicture, request.file!.originalname);
      } else if (profilePicture && profilePicture !== "default-pfp.svg") {
        userPfp = profilePicture;
      } else {
        userPfp = undefined;
      }

      const user = await prisma.user.create({
        data: { bio, email, privyId, username: usernameRegex, walletAddress, ...(userPfp && { userPfp }) },
      });

      await RedisClient.set(`user:${user.username}`, JSON.stringify(user));

      await sendRegisterEmail(email, username);

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
