import { Request, Response } from "express";
import { prisma } from "@/config/db";
import { sendBuyNotis } from "@/utils/emailNotis";
import { formatNumber } from "@/utils/utils";

export const setClaimDate = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "username doesn't exist" });
      return;
    }

    const claimDate = new Date();
    claimDate.setMonth(claimDate.getMonth() + 6);

    await prisma.user.update({ where: { username }, data: { claimDate } });

    res.status(200).send("saved!");
  } catch (error) {
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

    const now = new Date();
    if (now < user.claimDate!) {
      res.status(401).json({ message: "your creator token can only be claimed 6 months after creation" });
      return;
    }

    await prisma.user.update({ where: { username }, data: { claimDate: null } });

    res.status(200).json("user allowed!");
  } catch (error) {
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
      email: user.email, username, amount: formatedTokenAmount, buyer: shortenedBuyer
    });

    res.status(200).send("sent!");
  } catch (error) {
    res.status(500).json({ message: "error sending notis email" });
  }
};
