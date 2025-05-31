import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { HUDDLE_KEY } from '../utils/env.js';
import { db } from '../utils/firebase.js';
import { Recorder } from '@huddle01/server-sdk/recorder';

const recorder = new Recorder(
  process.env.HUDDLE_PROJECT_ID!,
  process.env.HUDDLE_API_KEY!
);

export const getAccessToken = async (
  req: Request,
  res: Response<TypedResponse<{ token: string }>>
): Promise<void> => {
  try {
    const { roomId, address } = req.body;

    if (!roomId || !address) {
      res.status(400).json({
        status: "error",
        message: "RoomId and address are required",
      });
      return;
    }

    // Check if stream exists and get its data
    const streamDoc = await db.collection('livestreams').doc(roomId).get();
    if (!streamDoc.exists) {
      res.status(404).json({
        status: "error",
        message: "Stream not found",
      });
      return;
    }

    const streamData = streamDoc.data();
    if (!streamData) {
      res.status(404).json({
        status: "error",
        message: "Stream data not found",
      });
      return;
    }

    // Check if user is the stream owner
    if (streamData.address !== address) {
      res.status(403).json({
        status: "error",
        message: "Only the stream owner can access this stream",
      });
      return;
    }

    // Generate access token
    const accessToken = new AccessToken({
      apiKey: HUDDLE_KEY,
      roomId,
      role: Role.HOST,
      permissions: { admin: true, canConsume: true, canProduce: true },
    });
    const token = await accessToken.toJwt();

    // If this is the first access (participants is 0), start livestreaming
    if (streamData.participants === 0) {
      try {
        await recorder.startLivestream({
          roomId,
          token,
          rtmpUrls: [`rtmp://138.68.142.137/live/${roomId}`]
        });

        // If stream is set to record, start recording
        if (streamData.recordStream) {
          const recordingToken = await generateRecordingToken(roomId);
          await recorder.startRecording({
            roomId,
            token: recordingToken,
            layout: "spotlight"
          });
        }
      } catch (error) {
        console.error("Failed to start livestream/recording:", error);
        // Continue with token generation even if livestream/recording fails
      }
    }

    res.status(200).json({
      status: "success",
      data: { token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to generate access token",
    });
  }
};

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