import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { API } from '@huddle01/server-sdk/api';
import { HUDDLE_KEY } from '../utils/env.js';
import { db } from '../utils/firebase.js';
import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const createStream = async (
    req: Request,
    res: Response<TypedResponse<{ roomId?: string, token?: string }>>
  ): Promise<void> => {
    try {
      const { title, startTime, address, creatorToken } = req.body;
  
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
        participants: 0
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

      // If this is their first stream and they provided a creatorToken, update their creatorAddress
      if (streamCount === 0 && creatorToken) {
        await userDocRef.update({
          totalStreams: newStreamCount,
          creatorToken: creatorToken
        });
      } else {
        await userDocRef.update({
          totalStreams: newStreamCount,
        });
      }

      console.log("Livestream saved:", streamData);
  
      if (isLive) {
        const accessToken = new AccessToken({
            apiKey: HUDDLE_KEY,
            roomId,
            role: Role.HOST,
            permissions: { admin: true, canConsume: true, canProduce: true },
        });
        const token = await accessToken.toJwt();
        res.status(201).json({
          status: "success",
          data: { roomId, token }
        });
      } else {
        res.status(201).json({
          status: "success",
          message: "Stream scheduled successfully",
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