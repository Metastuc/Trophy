import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from "../utils/firebase.js";

interface TipMessage {
    amount: string;
    symbol: string;
    username: string;
    uploadedPfp: string;
    timestamp: number;
    address: string;
}

interface TipResponse {
    message: TipMessage;
}

export const sendTip = async (req: Request, res: Response<TypedResponse<TipResponse>>): Promise<void> => {
    try {
        const { amount, symbol, address, roomId } = req.body;

        if (!amount || !symbol || !address || !roomId) {
            res.status(400).json({
                status: "error",
                message: "Amount, symbol, address, and roomId are required",
            });
            return;
        }

        // Get user data from Firestore
        const userQuery = await db.collection("users").where("address", "==", address).limit(1).get();

        if (userQuery.empty) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
            return;
        }

        const userData = userQuery.docs[0].data();
        const { username, uploadedPfp } = userData;

        // Create tip message object
        const tipMessage: TipMessage = {
            amount,
            symbol,
            username,
            uploadedPfp,
            timestamp: Date.now(),
            address,
        };

        // Add tip message to Firestore
        await db
            .collection("livestreams")
            .doc(roomId)
            .collection("messages")
            .add({
                ...tipMessage,
                message: `tipped ${amount} ${symbol}`,
            });

        res.status(200).json({
            status: "success",
            data: {
                message: tipMessage,
            },
        });
    } catch (error) {
        console.error("Error in sendTip:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to send tip",
        });
    }
};
