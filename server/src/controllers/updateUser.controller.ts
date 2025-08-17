import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Stream } from "../models/streamSchema";
import { DEFAULT_IMAGE } from "../utils/env";
import { deletePfp, savePfp } from "../utils/imgs";
import { RedisClient } from "../config/db";

export const updateProfile = async (req: Request, res: Response) => {
  const uploadedPfp = (req.file as any)?.location;
  const privyId = req.privyUser?.userId;

  const updateFields: Record<string, string> = {};
  const fieldMap: Record<string, string> = {
    email: "email",
    bio: "bio",
    xUrl: "xUrl",
    YTUrl: "YTUrl",
    // username: "username",
    profilePicture: "userPfp",
  };

  try {
    for (const [clientField, dbField] of Object.entries(fieldMap)) {
      if (clientField === "profilePicture") continue;

      const value = req.body[clientField];
      if (typeof value === "string" && value.trim() !== "") {
        updateFields[dbField] = value.trim();
      }
    }

    if (uploadedPfp && typeof uploadedPfp === "string") {
      updateFields.userPfp = uploadedPfp;
    } else if (typeof req.body.profilePicture === "string" && req.body.profilePicture.trim() !== "") {
      updateFields.userPfp = req.body.profilePicture.trim();
    }

    if (Object.keys(updateFields).length === 0) {
      res.status(422).json({ message: "No valid fields provided for update." });
      return;
    }

    const user = await prisma.user.update({
      where: { privyId },
      data: updateFields
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    const streams = await prisma.stream.findMany({
      where: {
        streamer: user.username,
        status: "Scheduled"
      },
      orderBy: { id: "desc" }
    });

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
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ message: "user not found :(" });
      return;
    }

    await prisma.user.update({
      where: { username },
      data: {
        totalFees: user.totalFees + Number(fees)
      }
    })

    await RedisClient.set(`user:${user.username}`, JSON.stringify(user));

    res.status(200).json({ message: "fees updated :)" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const saveStreamThumbnail = async (req: Request, res: Response) => {
  try {
    const thumbnailUrl = (req.file as any)?.location;
    const roomId = req.body.roomId;

    if (!thumbnailUrl || !roomId) {
      res.status(400).json({ error: "Thumbnail URL or room ID is missing" });
      return;
    }

    const stream = await prisma.stream.findUnique({ where: { roomId } });

    if (!stream) {
      res.status(404).json({ error: "Stream not found" });
      return;
    }

    if (stream.status === "Ended" || stream.status === "Scheduled") {
      res.status(400).json({ error: "Cannot update thumbnail for ended or scheduled streams" });
      return;
    }

    await prisma.stream.update({
      where: { roomId },
      data: {
        thumbnail: thumbnailUrl
      }
    })

    res.status(200).json({ message: "Thumbnail saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePfp = async (req: Request, res: Response) => {
  try {
    const imageToUpdate = req.file!.buffer;
    const privyId = req.privyUser;

    const user = await prisma.user.findUnique({ where: { privyId } });

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    const updatedImage = await savePfp(imageToUpdate, req.file!.originalname);

    if (user.userPfp !== DEFAULT_IMAGE) {
      await deletePfp(user.userPfp);
    }

    const uUser = await prisma.user.update({
      where: { privyId },
      data: {
        userPfp: updatedImage
      }
    })

    await RedisClient.set(`user:${user.username}`, JSON.stringify(uUser));

    res.status(200).json({ user: uUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const creatorTokenCreated = async (req: Request, res: Response) => {
  try {
    const { username, creatorToken } = req.body;

    if (!username || !creatorToken) {
      res.status(400).json({ error: "username or creator token address cannot be empty" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ error: "User doesn't exist" });
      return;
    }

    const uUser = await prisma.user.update({
      where: { username },
      data: {
        creatorToken
      }
    });

    await RedisClient.set(`user:${username}`, JSON.stringify(uUser));

    res.status(200).json({ message: "creator token saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
