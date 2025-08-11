import type { Request, Response } from "express";
import { HUDDLE_API_KEY } from "../utils/env";
import { AccessToken, Role, Permissions } from "@huddle01/server-sdk/auth";
import { Stream } from "../models/streamSchema";
import { format } from "date-fns";

export const getAccessToken = async (req: Request, res: Response) => {
  try {
    const { username, roomId } = req.body;

    if (!roomId || !username) {
      res.status(400).json({
        status: "error",
        message: "Missing roomId or address",
      });
      return;
    }

    const stream = await Stream.findOne({ roomId });

    if (!stream) {
      res.status(404).json({
        error: "Stream not found",
      });
      return;
    }

    const now = new Date();
    const startTime = new Date(stream.date);

    const isOwner = stream.streamer.toLowerCase() === username.toLowerCase();
    const role: Role = isOwner ? "host" : "listener";

    if (isOwner) {
      const token = await generateAccessToken(roomId, role);
      res.status(200).json({
        message: "Host access token generated successfully",
        token,
      });

      stream.status = "Live";
      await stream.save();
      return;
    }

    // Check if stream hasn't started
    if (startTime > new Date(format(now, "eee dd MMM y p"))) {
      res.status(403).json({
        error: "Stream has not started yet",
      });

      return;
    }

    const token = await generateAccessToken(roomId, role);

    // await recordStreamJoin(address, roomId);
    res.status(200).json({
      message: "Access token generated successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
    });
  }
};

export const generateAccessToken = async (roomId: string, role: Role) => {

  const permissions = ["host", "bot", "guest"].includes(role) ? {
    admin: true,
    canConsume: true,
    canProduce: true,
    canProduceSources: {
      cam: true,
      mic: true,
      screen: true,
    },
    canSendData: true,
    canRecvData: true,
  } : {
    admin: false,
    canConsume: true,
    canProduce: true,
    canRecvData: true,
    canSendData: true,
  };

  const token = new AccessToken({
    apiKey: HUDDLE_API_KEY,
    roomId,
    role,
    permissions
  });

  return await token.toJwt();
};
