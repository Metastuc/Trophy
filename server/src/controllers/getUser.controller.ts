import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Stream } from "../models/streamSchema.js";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        if (!username) {
            res.status(400).json({
                status: "error",
                message: "username is required",
            });
            return;
        }

        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({
                status: "error",
                message: "User not found",
            });
            return;
        }

        const streams = await Stream.find({
            streamer: username,
            status: "Scheduled",
        }).sort({ _id: -1 });

        res.status(200).json({
            status: "success",
            user,
            streams,
        });
    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to get user data",
        });
    }
};
