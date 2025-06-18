import { type Request, type Response } from "express";
import { db } from "../utils/firebase.js";
import { Recorder } from "@huddle01/server-sdk/recorder";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { API } from "@huddle01/server-sdk/api";
import { HUDDLE_API_KEY, HUDDLE_PROJECT_ID } from "../utils/env";

const recorder = new Recorder(HUDDLE_PROJECT_ID, HUDDLE_API_KEY);

interface RecordingResponse {
  success: boolean;
  message: string;
}

interface RecordingUrlResponse {
  recordingUrl: string;
  sessionId: string;
  startTime: number;
  endTime: number;
}

const generateToken = async (roomId: string) => {
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

export const startRecording = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, address } = req.body;

    if (!roomId || !address) {
      res.status(400).json({
        status: "error",
        message: "RoomId and address are required",
      });
      return;
    }

    // Check if user is the stream owner
    const streamDoc = await db.collection("livestreams").doc(roomId).get();
    if (!streamDoc.exists) {
      res.status(404).json({
        status: "error",
        message: "Stream not found",
      });
      return;
    }

    const streamData = streamDoc.data();
    if (streamData?.address !== address) {
      res.status(403).json({
        status: "error",
        message: "Only the stream owner can start recording",
      });
      return;
    }

    // Check if stream is already set to record
    if (streamData?.recordStream) {
      res.status(400).json({
        status: "error",
        message: "Stream is already set to record",
      });
      return;
    }

    // Generate token using the existing function
    const token = await generateToken(roomId);

    // Start recording using Huddle01 SDK
    await recorder.startRecording({
      roomId,
      token,
      layout: "spotlight",
    });

    // Update recordStream field in Firestore
    await db.collection("livestreams").doc(roomId).update({
      recordStream: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        success: true,
        message: "Stream recording started successfully",
      },
    });
  } catch (error) {
    console.error("Error in startRecording:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to start stream recording",
    });
  }
};

export const stopRecording = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, address } = req.body;

    if (!roomId || !address) {
      res.status(400).json({
        status: "error",
        message: "RoomId and address are required",
      });
      return;
    }

    // Check if user is the stream owner
    const streamDoc = await db.collection("livestreams").doc(roomId).get();
    if (!streamDoc.exists) {
      res.status(404).json({
        status: "error",
        message: "Stream not found",
      });
      return;
    }

    const streamData = streamDoc.data();
    if (streamData?.address !== address) {
      res.status(403).json({
        status: "error",
        message: "Only the stream owner can stop recording",
      });
      return;
    }

    // Check if stream is already set to not record
    if (!streamData?.recordStream) {
      res.status(400).json({
        status: "error",
        message: "Stream is already set to not record",
      });
      return;
    }

    // Update recordStream field in Firestore
    await db.collection("livestreams").doc(roomId).update({
      recordStream: false,
    });

    res.status(200).json({
      status: "success",
      data: {
        success: true,
        message: "Stream recording disabled successfully",
      },
    });
  } catch (error) {
    console.error("Error in stopRecording:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to disable stream recording",
    });
  }
};

export const endLivestream = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, address } = req.body;

    if (!roomId || !address) {
      res.status(400).json({
        status: "error",
        message: "RoomId and address are required",
      });
      return;
    }

    // Check if user is the stream owner
    const streamDoc = await db.collection("livestreams").doc(roomId).get();
    if (!streamDoc.exists) {
      res.status(404).json({
        status: "error",
        message: "Stream not found",
      });
      return;
    }

    const streamData = streamDoc.data();
    if (streamData?.address !== address) {
      res.status(403).json({
        status: "error",
        message: "Only the stream owner can end the livestream",
      });
      return;
    }

    // If recording is active, stop it first
    if (streamData?.recordStream) {
      await recorder.stop({
        roomId,
      });
    }

    // Update stream status in Firestore
    await db.collection("livestreams").doc(roomId).update({
      status: "ended",
      recordStream: false,
      endedAt: Date.now(),
    });

    res.status(200).json({
      status: "success",
      data: {
        success: true,
        message: "Livestream ended successfully",
      },
    });
  } catch (error) {
    console.error("Error in endLivestream:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to end livestream",
    });
  }
};

export const getRecordingUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      res.status(400).json({
        status: "error",
        message: "RoomId is required",
      });
      return;
    }

    // Check if stream exists
    const streamDoc = await db.collection("livestreams").doc(roomId).get();
    if (!streamDoc.exists) {
      res.status(404).json({
        status: "error",
        message: "Stream not found",
      });
      return;
    }

    // Get session list for the room
    const api = new API({
      apiKey: process.env.HUDDLE_API_KEY!,
    });

    const sessionList = await api.getRoomSessions({
      roomId,
    });

    if (!sessionList || sessionList.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No sessions found for this room",
      });
      return;
    }

    // Get the first session
    const firstSession = sessionList[0];
    const { sessionId, startTime, endTime } = firstSession;

    // Get recording for the session
    const recordings = await api.getRecordings({
      sessionId,
      limit: 1,
      cursor: 1,
    });

    if (!recordings || !recordings.data || recordings.data.recordings.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No recording found for this session",
      });
      return;
    }

    const recordingUrl = recordings.data.recordings[0].recordingUrl;

    res.status(200).json({
      status: "success",
      data: {
        recordingUrl,
        sessionId,
        startTime,
        endTime: endTime || 0,
      },
    });
  } catch (error) {
    console.error("Error in getRecordingUrl:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to get recording URL",
    });
  }
};
