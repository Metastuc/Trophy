import { prisma } from "@/config/db";
import { Request, Response } from "express";
import { sendValidationLinkEmail } from "@/utils/emailNotis";

export const validationLink = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await sendValidationLinkEmail(email);

    res.status(200).json({ message: "sent!" });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error sending verification link email" });
  }
};

export const validateEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query as unknown as string;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "email does not exist" });
      return;
    }

    if (user.emailVerified) {
      res.status(400).json({ message: "email verified already" });
      return;
    }

    await prisma.user.update({ where: { email }, data: { emailVerified: true } });

    res.status(200).json({ message: "verified!" });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "error verifying email" });
  }
};
