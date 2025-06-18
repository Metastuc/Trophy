import type { Request, Response } from "express";
import { HUDDLE_API_KEY } from "../utils/env";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Stream } from "../models/streamSchema";
import { format } from "date-fns";
import { Recorder } from "@huddle01/server-sdk/recorder";

export const getAccessToken = async (req: Request, res: Response) => {
  try {
    const { name, roomId } = req.body;

    if (!roomId || !name) {
      res.status(400).json({
        status: "error",
        message: "Missing roomId or address",
      });
      return;
    }

    const stream = await Stream.findOne({ roomId });

    if (!stream) {
      res.status(404).json({
        status: "error",
        message: "Stream not found",
      });
      return;
    }

    const now = new Date();
    const startTime = new Date(stream.date!);
    const isOwner = stream.streamer.toLowerCase() === name.toLowerCase();

    // Check if stream hasn't started
    if (startTime > new Date(format(now, "eee dd MMM y p"))) {
      res.status(403).json({
        status: "error",
        message: "Stream has not started yet",
      });
      return;
    }

    // Assign role
    const role: Role = isOwner ? "host" : "listener";

    const permissions = isOwner
      ? {
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
        }
      : {
          admin: false,
          canConsume: true,
          canProduce: true,
          canRecvData: true,
          canSendData: true,
        };

    // Generate access token
    const accessToken = new AccessToken({
      apiKey: HUDDLE_API_KEY,
      roomId,
      role,
      permissions,
    });

    const token = await accessToken.toJwt();

    // await recordStreamJoin(address, roomId);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to generate access token",
    });
  }
};

// const recorder = new Recorder(
//   process.env.HUDDLE_PROJECT_ID!,
//   process.env.HUDDLE_API_KEY!
// );

const generateRecordingToken = async (roomId: string) => {
  const token = new AccessToken({
    apiKey: process.env.HUDDLE_API_KEY!,
    roomId: roomId,
    role: Role.BOT,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });

  return await token.toJwt();
};
