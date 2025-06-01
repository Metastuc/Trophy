import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';

interface CallUpRequest {
    username: string;
    status: "pending" | "accepted" | "rejected";
    peerId: string;
}

export const createCallUpRequest = async (
    req: Request,
    res: Response<TypedResponse<{ message?: string }>>
): Promise<void> => {
    try {
        const { roomId, username } = req.body;

        if (!roomId || !username) {
            res.status(400).json({
                status: "error",
                message: "RoomId and username are required"
            });
            return;
        }

        // Check if livestream exists
        const livestreamRef = db.collection('livestreams').doc(roomId);
        const livestreamDoc = await livestreamRef.get();

        if (!livestreamDoc.exists) {
            res.status(404).json({
                status: "error",
                message: "Livestream not found"
            });
            return;
        }

        // Check number of existing requests
        const requestsSnapshot = await livestreamRef.collection('requests').get();
        if (requestsSnapshot.size >= 4) {
            res.status(400).json({
                status: "error",
                message: "Maximum number of requests (4) reached"
            });
            return;
        }

        // Create request object
        const requestData: CallUpRequest = {
            username,
            status: "pending",
            peerId: ""
        };

        // Add request to subcollection
        await livestreamRef.collection('requests').add(requestData);

        res.status(201).json({
            status: "success",
            message: "Call-up request created successfully"
        });
    } catch (error) {
        console.error("Error in createCallUpRequest:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to create call-up request"
        });
    }
};

export const updateCallUpRequest = async (
    req: Request,
    res: Response<TypedResponse<{ message?: string }>>
): Promise<void> => {
    try {
        const { roomId, username, status, peerId } = req.body;

        if (!roomId || !username || !status || !peerId) {
            res.status(400).json({
                status: "error",
                message: "RoomId, username, status, and peerId are required"
            });
            return;
        }

        if (status !== "accepted" && status !== "rejected") {
            res.status(400).json({
                status: "error",
                message: "Status must be either 'accepted' or 'rejected'"
            });
            return;
        }

        // Check if livestream exists
        const livestreamRef = db.collection('livestreams').doc(roomId);
        const livestreamDoc = await livestreamRef.get();

        if (!livestreamDoc.exists) {
            res.status(404).json({
                status: "error",
                message: "Livestream not found"
            });
            return;
        }

        // Find request with matching username
        const requestQuery = await livestreamRef.collection('requests')
            .where('username', '==', username)
            .limit(1)
            .get();

        if (requestQuery.empty) {
            res.status(404).json({
                status: "error",
                message: "No request found for this username"
            });
            return;
        }

        // Update the request
        const requestDoc = requestQuery.docs[0];
        await requestDoc.ref.update({
            status,
            peerId
        });

        res.status(200).json({
            status: "success",
            message: `Call-up request ${status} successfully`
        });
    } catch (error) {
        console.error("Error in updateCallUpRequest:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to update call-up request"
        });
    }
};