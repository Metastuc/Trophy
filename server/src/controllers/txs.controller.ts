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
      res.status(400).json({ message: "send amount as a number" });
      return;
    }

    if (!TOKENS.includes(token.toUpperCase())) {
      res.status(400).json({ message: 'send token string as either "USDC", "DEGEN", "ETH", "ZORA", "BNKR" or "FLAY" in lower or uppercase' });
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

      res.status(200).send("saved");
      return;
    }

    await prisma.tipTxs.update({
      where: { username },
      data: {
        [tokenKey]: { increment: amount },
        tx: { increment: 1 },
      },
    });

    res.status(200).send("updated");
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error updating tip tx" })
  }
}

export const getTrophyTxs = async (req: Request, res: Response) => {
  try {
    const tipTxs = await prisma.tipTxs.findFirst({ where: { username } }) || 0;
    const creatorTokenTxs = await prisma.cVolume.findFirst({ where: { username } }) || 0;

    res.status(200).json({ tipTxs, creatorTokenTxs });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const saveCreatorTokenVolume = async (req: Request, res: Response) => {
  try {
    const { amount }: { amount: number } = req.body;

    if (isNaN(amount)) {
      res.status(400).json({ message: "amount must be sent as int" });
      return
    }

    const cVolume = await prisma.cVolume.findFirst({ where: { username } });
    if (!cVolume) {
      await prisma.cVolume.create({
        data: {
          volume: amount,
        }
      });

      res.status(201).send("saved");
      return;
    }

    await prisma.cVolume.update({
      where: { username },
      data: {
        volume: {
          increment: amount
        }
      }
    });

    res.status(201).send("updated");
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}