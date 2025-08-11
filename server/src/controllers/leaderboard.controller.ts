import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { getMcapAndPrice } from "../utils/flaunch";
import type { Address } from "viem";
import { formatNumber, getHolders } from "../utils/utils";

interface ILeaderboard {
  price: string | number,
  pfp: string,
  username: string,
  totalStreams: number,
  epicStreams: string,
  arrow: string,
  topHolders: IHolders[];
  mcap: string
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

    const creators = await User.find({ creatorToken: { $exists: true, $ne: null } });

    const leaderboard: ILeaderboard[] = [];

    switch (filter) {
      case "price":
        return true
      case "streams":
        return true
      default:

        for (const creator of creators) {
          const creatorToken = creator.creatorToken;

          const { mcap, price } = await getMcapAndPrice(creatorToken as Address);
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

          if (creator.tokenPrice <= Number(price)) {
            leaderboard.push({
              price, arrow, mcap: tokenMcap,
              totalStreams: creator.totalStreams,
              epicStreams,
              username: creator.username,
              topHolders,
              pfp: creator.userPfp
            });
            creator.tokenPrice = Number(price);
            creator.save();
          } else {
            arrow = "down";

            leaderboard.push({
              price, arrow, mcap: tokenMcap, 
              totalStreams: creator.totalStreams, 
              epicStreams,
              username: creator.username,
              topHolders,
              pfp: creator.userPfp
            });

            creator.tokenPrice = Number(price);
            creator.save();
          }
        }

        leaderboard.sort((a, b) => Number(b.mcap) - Number(a.mcap));
        res.status(200).json({ message: "leaderboard fetched", leaderboard: leaderboard.slice(0, 20) });

        return true;
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
