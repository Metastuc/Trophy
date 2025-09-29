import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { getTokenDetails } from "../utils/flaunch";
import type { Address } from "viem";
import { formatNumber, getHolders, LdummyData } from "../utils/utils";
import { prisma } from "../config/db";

interface ILeaderboard {
  price: string | number;
  pfp: string;
  username: string;
  totalStreams: number;
  epicStreams: string;
  arrow: string;
  topHolders: IHolders[];
  mcap: string;
  tokenPercentage: string;
}

interface IHolders {
  holderAddress: string;
  symbol: string;
  percentage: string;
  tokenAmount: string;
}

export const leaderboard = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;

    const creators = await prisma.user.findMany({
      where: {
        creatorToken: {
          not: null,
        },
      },
    });

    const leaderboard: ILeaderboard[] = [];

    switch (filter) {
      case "price":
        return true;
      case "streams":
        return true;
      default:
        for (const creator of creators) {
          const creatorToken = creator.creatorToken;

          const { mcap, price } = await getTokenDetails(creatorToken as Address);
          let arrow: "up" | "down" = "up";
          const topHolders: IHolders[] = [];

          const holders = await getHolders(creatorToken!);

          for (const holder of holders) {
            const { amount, address, symbol } = holder;
            const tokenInUnits = Number(amount) / 1e18;
            const percentage = ((tokenInUnits / 1e11) * 100).toFixed(1).replace(/\.0$/, "") + "%";

            const tokenAmount = formatNumber((tokenInUnits * 1e18).toString());

            const holderAddress = address.slice(0, 6) + "..." + address(-4);

            topHolders.push({ percentage, tokenAmount, holderAddress, symbol });
          }

          const epicStreams = formatNumber(creator.epicStreams.toString());
          const tokenMcap = formatNumber(mcap);

          const currentTokenPrice = creator.tokenPrice;
          const newTokenPrice = Number(price);
          const tokenPercentage =
            (((newTokenPrice - currentTokenPrice) / currentTokenPrice) * 100).toFixed(2).replace(/\.0$/, "") + "%";

          if (currentTokenPrice <= newTokenPrice) {
            leaderboard.push({
              price,
              arrow,
              mcap: tokenMcap,
              totalStreams: creator.totalStreams,
              epicStreams,
              username: creator.username,
              topHolders,
              pfp: creator.userPfp,
              tokenPercentage,
            });
          } else {
            arrow = "down";

            leaderboard.push({
              price,
              arrow,
              mcap: tokenMcap,
              totalStreams: creator.totalStreams,
              epicStreams,
              username: creator.username,
              topHolders,
              pfp: creator.userPfp,
              tokenPercentage,
            });
          }

          await prisma.user.update({
            where: { username: creator.username },
            data: {
              tokenPrice: newTokenPrice,
            },
          });
        }

        leaderboard.sort((a, b) => Number(b.mcap) - Number(a.mcap));
        res
          .status(200)
          .json({ message: "leaderboard fetched", leaderboard: leaderboard.slice(0, 20), dummyData: LdummyData });

        return true;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error getting leaderboard info" });
  }
};
