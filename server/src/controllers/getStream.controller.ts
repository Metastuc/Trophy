import type { Request, Response } from "express";
import { RedisClient, prisma } from "../config/db";

export const getStream = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const streamCache = await RedisClient.get(`stream:${roomId}`);

    // if (streamCache) {
    //   const streamObjs = JSON.parse(streamCache);
    //   res.status(200).json({
    //     title: streamObjs.title,
    //     streamer: streamObjs.streamer,
    //     creatorToken: streamObjs.creatorToken,
    //     creatorAddress: streamObjs.creatorAddress,
    //     pfp: streamObjs.userPfp,
    //   });

    //   return;
    // }

    const stream = await prisma.stream.findUnique({ where: { roomId } });

    if (!stream) {
      res.status(400).json({ message: "Invalid roomId" });
      return;
    }

    if (stream.status === "Ended") {
      res.status(400).json({ message: "Stream has ended!" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username: stream.streamer } });
    if (!user) {
      res.status(400).json({ message: "Invalid streamer" });
      return;
    }

    // await RedisClient.set(`stream:${roomId}`, JSON.stringify(stream));
    res.status(200).json({
      title: stream.title,
      streamer: stream.streamer,
      creatorToken: user.creatorToken,
      creatorAddress: user.walletAddress,
      pfp: user.userPfp,
    });
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: "error fetching stream details" });
  }
};
