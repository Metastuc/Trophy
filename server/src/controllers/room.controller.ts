// src/controllers/room.controller.ts
import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { API } from '@huddle01/server-sdk/api';
import { HUDDLE_KEY } from '../utils/env.js';
import { db } from '../utils/firebase.js';

export const createStream = async (
    req: Request,
    res: Response<TypedResponse<{ roomId?: string }>>
  ): Promise<void> => {
    try {
      const { title, startTime, address } = req.body;
  
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
      };
  
      await db.collection("livestreams").doc(roomId).set(streamData);
      console.log("Livestream saved:", streamData);
  
      if (isLive) {
        res.status(201).json({
          status: "success",
          data: { roomId },
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
  