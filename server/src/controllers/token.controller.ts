import { Request, Response } from "express";
import { prisma } from "@/config/db";
import { sendBuyNotis } from "@/utils/emailNotis";
import { formatNumber } from "@/utils/utils";

export const setClaimDate = async (req: Request, res: Response) => {
  try {
    const { username, tokenGotten } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "username doesn't exist" });
      return;
    }

    const claimDate = new Date();
    claimDate.setMonth(claimDate.getMonth() + 1);

    const token = Number(tokenGotten);

    await prisma.tokenClaimModel.create({ data: { username, claimDate, lockedToken: token, tokenLeft: token } });

    res.status(200).send("saved!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error setting claim date" });
  }
};

export const claimToken = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ message: "username doesn't exist" });
      return;
    }

    if (!user.creatorToken) {
      res.status(401).json({ message: "creator token must be activated!" });
      return;
    }

    const tokenClaimInfo = await prisma.tokenClaimModel.findUnique({ where: { username } });

    const now = new Date();

    const { lockedToken, lastClaimed, claimDate, tokenLeft } = tokenClaimInfo!;

    if (tokenLeft === 0) {
      res.status(403).json({ message: "Tokens has been fully redeemed" });
      return;
    }

    if (now < claimDate) {
      res.status(401).json({ message: "Your token can only be claimed one month after creation/the previous claim" });
      return;
    }

    const monthsPassed = now.getMonth() - lastClaimed.getMonth();

    let amountOfTokens: number = 0;
    let tokenLeftToClaim: number = 0;
    let newClaimDate: Date = now;

    if (monthsPassed >= 5) {
      amountOfTokens = lockedToken;

      tokenLeftToClaim = 0;

      newClaimDate = new Date("0000-00-00");
    } else if (monthsPassed >= 1 && monthsPassed < 5) {
      amountOfTokens = lockedToken * monthsPassed * 0.2;
      tokenLeftToClaim = tokenLeft - amountOfTokens;

      if (tokenLeftToClaim === 0) {
        newClaimDate = new Date("0000-00-00");
      } else {
        const newDate = now;

        newDate.setMonth(now.getMonth() + 1);

        newClaimDate = newDate;
      }
    }

    await prisma.tokenClaimModel.update({
      where: { username },
      data: {
        claimDate: newClaimDate,
        lastClaimed: now,
        totalClaimed: { increment: amountOfTokens },
        tokenLeft: tokenLeftToClaim,
      },
    });

    res.status(200).json({ message: "allowed", amountOfTokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "couldn't claim token" });
  }
};

export const buyNotis = async (req: Request, res: Response) => {
  try {
    const { username, amount, buyer } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "username doesn't exist" });
      return;
    }

    const formatedTokenAmount = formatNumber(amount.replace(/,/g, ""));
    const shortenedBuyer = buyer.split(0, 4) + "..." + buyer.split(-4);

    await sendBuyNotis({
      email: user.email,
      username,
      amount: formatedTokenAmount,
      buyer: shortenedBuyer,
    });

    res.status(200).send("sent!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error sending notis email" });
  }
};
