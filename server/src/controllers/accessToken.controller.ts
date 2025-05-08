import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { HUDDLE_KEY } from '../utils/env.js';
import { db } from '../utils/firebase.js';
import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const getAccessToken = async (
    req: Request,
    res: Response<TypedResponse<{ token?: string }>>
  ): Promise<void> => {
    try {
      const { roomId, address } = req.body;
  
      if (!roomId || !address) {
        res.status(400).json({
          status: "error",
          message: "Missing roomId or address",
        });
        return;
      }
  
      // Find the stream from Firestore
      const streamSnap = await db
        .collection("livestreams")
        .where("roomId", "==", roomId)
        .limit(1)
        .get();
  
      if (streamSnap.empty) {
        res.status(404).json({
          status: "error",
          message: "Stream not found",
        });
        return;
      }
  
      const stream = streamSnap.docs[0].data();
      const now = new Date();
      const startTime = new Date(stream.startTime);
      const isOwner = stream.address.toLowerCase() === address.toLowerCase();
  
      // Check if stream has started
      if (startTime > now) {
        res.status(403).json({
          status: "error",
          message: "Stream has not started yet",
        });
        return;
      }
  
      // Assign role
      const role: Role = isOwner ? "host" : "listener";
  
      // Generate access token
      const accessToken = new AccessToken({
        apiKey: HUDDLE_KEY,
        roomId,
        role,
      });
      
      const token = await accessToken.toJwt();
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