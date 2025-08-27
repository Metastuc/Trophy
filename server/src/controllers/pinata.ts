import { PinataSDK } from "pinata";
import {} from "@aws-sdk/client-s3";
import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { PINATA_JWT, PINATA_GATEWAY, JPG_DEFAULT_IMAGE, DEFAULT_IMAGE } from "../utils/env";

let pinata: PinataSDK | undefined = undefined;
export const createTokenUri = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ message: "username not set" });
      return;
    }

    if (!pinata) {
      pinata = new PinataSDK({
        pinataJwt: PINATA_JWT,
        pinataGateway: PINATA_GATEWAY,
      });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ message: "user with associated username not found" });
      return;
    }

    let image: string;
    if (user.userPfp !== DEFAULT_IMAGE) {
      image = user.userPfp
    } else {
      image = JPG_DEFAULT_IMAGE
    }

    const { cid: imageCID } = await pinata.upload.public.url(image);

    const { cid: metadataCID } = await pinata.upload.public.json({
      name: username,
      symbol: username.toUpperCase(),
      description: `${username} creator token, created on Trophy`,
      image: `ipfs://${imageCID}`
    });

    res.status(200).json({ tokenUri: `ipfs://${metadataCID}` });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating token metadata", error: error.message })
  }
};
