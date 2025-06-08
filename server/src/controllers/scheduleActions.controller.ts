import type { Request, Response } from "express";
import { Stream } from "../models/streamSchema";

export const scheduleActions = async (req: Request, res: Response) => {
    try {
        const { action, title, id, date }: { action: string; title?: string; id: string; date: string } = req.body;

        if (!action || !title) {
            res.status(400).json({
                status: "error",
                message: "Missing action or title",
            });
            return;
        }

        if (action === "delete") {
            await Stream.findByIdAndDelete(id);
            res.status(200).json({
                status: "success",
                message: "Stream deleted successfully",
            });
            return;
        }

        await Stream.findByIdAndUpdate(
            id,
            {
                $set: {
                    title,
                    date,
                },
            },
            { new: true },
        );

        res.status(200).json({
            status: "success",
            message: "Stream updated successfully",
        });
    } catch (error) {
        console.error("Error in scheduleActions:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to update stream",
        });
    }
};
