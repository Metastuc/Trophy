import type { Request, Response } from "express";
import { Stream } from "../models/streamSchema";
import { prisma } from "../config/db";

export const scheduleActions = async (req: Request, res: Response) => {
  try {
    const { action, title, id, date }: { action: string; title?: string; id: string; date?: string } = req.body;

    if (!action || !id) {
      res.status(400).json({
        status: "error",
        message: "Missing action or id",
      });
      return;
    }

    if (action === "delete") {
      await prisma.stream.delete({ where: { id } });

      res.status(200).json({
        status: "success",
        message: "Scheduled stream deleted successfully",
      });
      return;
    }

    await prisma.stream.update({
      where: { id },
      data: {
        title,
        date
      }
    });

    res.status(200).json({
      message: "Stream updated successfully",
    });
  } catch (error) {
    console.error("Error in scheduleActions:", error);
    res.status(500).json({
      message: "Failed to update stream",
    });
  }
};
