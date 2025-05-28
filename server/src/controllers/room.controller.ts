import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { API } from '@huddle01/server-sdk/api';
import { HUDDLE_KEY } from '../utils/env.js';
import { db } from '../utils/firebase.js';
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Recorder } from '@huddle01/server-sdk/recorder';

interface RoomResponse {
  roomId?: string;
  token?: string;
  streamLink?: string;
}

const recorder = new Recorder(
  process.env.HUDDLE_PROJECT_ID!,
  process.env.HUDDLE_API_KEY!
);

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

export const createStream = async (
    req: Request,
    res: Response<TypedResponse<RoomResponse>>
  ): Promise<void> => {
    try {
      const { title, startTime, address, recordStream = false } = req.body;
  
      const streamTime = new Date(startTime);
      const now = new Date();
  
      const api = new API({ apiKey: HUDDLE_KEY });
  
      const newRoom = await api.createRoom({
        roomLocked: false,
        metadata: JSON.stringify({ title }),
      });

      const roomId = newRoom.roomId;
      const isLive = streamTime <= now;
  
      const streamData = {
        title,
        address,
        startTime: streamTime.toISOString(),
        roomId,
        status: isLive ? "live" : "scheduled",
        participants: 0,
        recordStream: recordStream
      };
  
      await db.collection("livestreams").doc(roomId).set(streamData);
      
      const userSnap = await db.collection('users')
      .where("address", "==", address)
      .limit(1)
      .get();
    
      if (userSnap.empty) {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
        return;
      }

      const streamCount = userSnap.docs[0].data().totalStreams;
      const newStreamCount = streamCount + 1;

      const userDocRef = userSnap.docs[0].ref;

      await userDocRef.update({
        totalStreams: newStreamCount,
      });

      console.log("Livestream saved:", streamData);
  
      if (isLive) {
        const accessToken = new AccessToken({
            apiKey: HUDDLE_KEY,
            roomId,
            role: Role.HOST,
            permissions: { admin: true, canConsume: true, canProduce: true },
        });
        const token = await accessToken.toJwt();

        // Always start recording for immediate streams
        try {
          const recordingToken = await generateRecordingToken(roomId);
          await recorder.startRecording({
            roomId,
            token: recordingToken,
            layout: "spotlight"
          });
        } catch (recordingError) {
          console.error("Failed to start recording:", recordingError);
          // Continue with stream creation even if recording fails
        }

        res.status(201).json({
          status: "success",
          data: { roomId, token }
        });
      } else {
        res.status(201).json({
          status: "success",
          message: "Stream scheduled successfully",
          data: {
            streamLink: `${process.env.BASE_CLIENT_URL}/${roomId}`
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Room creation failed",
      });
    }
};