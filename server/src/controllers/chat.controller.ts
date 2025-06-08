import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from "../utils/firebase.js";

interface ChatMessage {
    message: string;
    username: string;
    uploadedPfp: string;
    timestamp: number;
    address: string;
}

interface ChatResponse {
    messages: ChatMessage[];
}

export const sendMessage = async (req: Request, res: Response<TypedResponse<ChatResponse>>): Promise<void> => {
    try {
        const { message, address, roomId } = req.body;

        if (!message || !address || !roomId) {
            res.status(400).json({
                status: "error",
                message: "Message, address, and roomId are required",
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

        // Create message object
        const chatMessage: ChatMessage = {
            message,
            username,
            uploadedPfp,
            timestamp: Date.now(),
            address,
        };

        // Add message to Firestore
        await db.collection("livestreams").doc(roomId).collection("messages").add(chatMessage);

        res.status(200).json({
            status: "success",
            data: {
                messages: [chatMessage],
            },
        });
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to send message",
        });
    }
};

export const getMessages = async (req: Request, res: Response<TypedResponse<ChatResponse>>): Promise<void> => {
    try {
        const { roomId } = req.params;

        if (!roomId) {
            res.status(400).json({
                status: "error",
                message: "roomId is required",
            });
            return;
        }

        // Get messages from Firestore
        const messagesQuery = await db
            .collection("livestreams")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .limit(50)
            .get();

        const messages: ChatMessage[] = messagesQuery.docs.map((doc) => doc.data() as ChatMessage);

        res.status(200).json({
            status: "success",
            data: {
                messages,
            },
        });
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to get messages",
        });
    }
};
