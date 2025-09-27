import type { Request, Response } from "express";
import { RedisClient, prisma } from "../config/db";
import { getTokenDetails } from "../utils/flaunch";
import type { Address } from "viem";
import { UdummyData } from "../utils/utils";

interface IHoldings {
  tokenSymbol: string;
  tokenImage: string;
  mcap: string;
  price: string;
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ message: "username is required" });
      return;
    }

    const userCache = await RedisClient.get(`user:${username}`);
    const streamCache = await RedisClient.get(`stream:${username}`);
    const holdingsCache = await RedisClient.get(`holding:${username}`);

    if (userCache && streamCache && holdingsCache) {
      res.status(200).json({
        user: JSON.parse(userCache),
        streams: JSON.parse(streamCache),
        holdings: JSON.parse(holdingsCache),
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const streams = await prisma.stream.findMany({
      where: {
        streamer: username,
        status: "Scheduled",
      },
      orderBy: { id: "desc" },
    });

    const holdings: IHoldings[] = [];
    for (const holding of user.holdings) {
      const { mcap, tokenSymbol, price, tokenImage } = await getTokenDetails(holding as Address, true);
      holdings.push({
        mcap,
        price,
        tokenImage: tokenImage!,
        tokenSymbol: tokenSymbol!,
      });
    }

    await RedisClient.set(`user:${username}`, JSON.stringify(user));
    await RedisClient.set(`stream:${username}`, JSON.stringify(streams));
    await RedisClient.set(`holding:${username}`, JSON.stringify(holdings));

    res.status(200).json({
      message: "User data retrieved successfully",
      user,
      streams,
      dummyData: UdummyData,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ message: "error fetching user data" });
  }
};
