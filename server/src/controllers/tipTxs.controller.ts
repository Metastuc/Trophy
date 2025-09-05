import type { Request, Response } from "express";
import { prisma } from "@/config/db";

const username = "trophy";

const TOKENS = ["USDC", "DEGEN", "ETH", "ZORA", "BNKR", "FLAY"];
const tokenMap = {
  usdc: "USDC",
  degen: "DEGEN",
  zora: "ZORA",
  bnkr: "BNKR",
  flay: "FLAY",
}

type tokens = "usdc" | "degen" | "zora" | "bnkr" | "flay"

export const trackTipTxs = async (req: Request, res: Response) => {
  try {
    const { token, amount }: { token: string, amount: number } = req.body;
    
    if (isNaN(amount)) {
      res.status(400).json({ error: "send amount as a number" });
      return;
    }

    if (!TOKENS.includes(token.toUpperCase())) {
      res.status(400).json({ error: 'send token string as either "USDC", "DEGEN", "ETH", "ZORA", "BNKR" or "FLAY" in lower or uppercase' });
      return;
    }

    const tokenInLowerCase = token.toLowerCase();
    const tokensTipped = await prisma.tipTxs.findFirst({ where: { username } });

    const tokenKey = tokenMap[tokenInLowerCase as tokens] || "ETH";

    if (!tokensTipped) {
      await prisma.tipTxs.create({
        data: {
          [tokenKey]: amount,
        },
      });

      res.status(200).json({ message: "tip set!" });
      return;
    }

    await prisma.tipTxs.update({
      where: { username },
      data: {
        [tokenKey]: { increment: amount },
        tx: { increment: 1 },
      },
    });

    res.status(200).json({ message: "updated!" });
  } catch (error) {
    res.status(500).json({ error: "error updating tip tx" })
  }
}

export const getTipTxs = async (req: Request, res: Response) => {
  try {
    const tipTxs = await prisma.tipTxs.findFirst({ where: { username } });

    res.status(200).json({ tipTxs });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}
