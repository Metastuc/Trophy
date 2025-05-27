import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';
import { Recorder } from '@huddle01/server-sdk/recorder';
import { AccessToken, Role } from '@huddle01/server-sdk/auth';

const recorder = new Recorder(
    process.env.HUDDLE_PROJECT_ID!,
    process.env.HUDDLE_API_KEY!
);

interface RecordingResponse {
    success: boolean;
    message: string;
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

export const startRecording = async (
    req: Request,
    res: Response<TypedResponse<RecordingResponse>>
): Promise<void> => {
    try {
        const { roomId, address } = req.body;

        if (!roomId || !address) {
            res.status(400).json({
                status: "error",
                message: "RoomId and address are required"
            });
            return;
        }

        // Check if user is the stream owner
        const streamDoc = await db.collection('livestreams').doc(roomId).get();
        if (!streamDoc.exists) {
            res.status(404).json({
                status: "error",
                message: "Stream not found"
            });
            return;
        }

        const streamData = streamDoc.data();
        if (streamData?.address !== address) {
            res.status(403).json({
                status: "error",
                message: "Only the stream owner can start recording"
            });
            return;
        }

        // Generate token for recording
        const token = await generateToken(roomId);

        // Start recording
        await recorder.startRecording({
            roomId,
            token,
            layout: "grid"
        });

        // Update stream status in Firestore
        await db.collection('livestreams').doc(roomId).update({
            isRecording: true
        });

        res.status(200).json({
            status: "success",
            data: {
                success: true,
                message: "Recording started successfully"
            }
        });
    } catch (error) {
        console.error("Error in startRecording:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to start recording"
        });
    }
};

export const stopRecording = async (
    req: Request,
    res: Response<TypedResponse<RecordingResponse>>
): Promise<void> => {
    try {
        const { roomId, address } = req.body;

        if (!roomId || !address) {
            res.status(400).json({
                status: "error",
                message: "RoomId and address are required"
            });
            return;
        }

        // Check if user is the stream owner
        const streamDoc = await db.collection('livestreams').doc(roomId).get();
        if (!streamDoc.exists) {
            res.status(404).json({
                status: "error",
                message: "Stream not found"
            });
            return;
        }

        const streamData = streamDoc.data();
        if (streamData?.address !== address) {
            res.status(403).json({
                status: "error",
                message: "Only the stream owner can stop recording"
            });
            return;
        }

        // Stop recording
        await recorder.stop({
            roomId
        });

        // Update stream status in Firestore
        await db.collection('livestreams').doc(roomId).update({
            isRecording: false
        });

        res.status(200).json({
            status: "success",
            data: {
                success: true,
                message: "Recording stopped successfully"
            }
        });
    } catch (error) {
        console.error("Error in stopRecording:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to stop recording"
        });
    }
};

export const endLivestream = async (
    req: Request,
    res: Response<TypedResponse<RecordingResponse>>
): Promise<void> => {
    try {
        const { roomId, address } = req.body;

        if (!roomId || !address) {
            res.status(400).json({
                status: "error",
                message: "RoomId and address are required"
            });
            return;
        }

        // Check if user is the stream owner
        const streamDoc = await db.collection('livestreams').doc(roomId).get();
        if (!streamDoc.exists) {
            res.status(404).json({
                status: "error",
                message: "Stream not found"
            });
            return;
        }

        const streamData = streamDoc.data();
        if (streamData?.address !== address) {
            res.status(403).json({
                status: "error",
                message: "Only the stream owner can end the livestream"
            });
            return;
        }

        // If recording is active, stop it first
        if (streamData?.isRecording) {
            await recorder.stop({
                roomId
            });
        }

        // Update stream status in Firestore
        await db.collection('livestreams').doc(roomId).update({
            isLive: false,
            isRecording: false,
            endedAt: Date.now()
        });

        res.status(200).json({
            status: "success",
            data: {
                success: true,
                message: "Livestream ended successfully"
            }
        });
    } catch (error) {
        console.error("Error in endLivestream:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to end livestream"
        });
    }
}; 