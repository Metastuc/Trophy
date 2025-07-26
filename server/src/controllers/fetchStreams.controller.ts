import type { Request, Response } from "express";
import { Stream } from "../models/streamSchema";

export const fetchStreams = async (req: Request, res: Response) => {
  try {
    const streams = await Stream.find({ status: "Live" }).sort({ createdAt: -1 });
    if (streams.length === 0) {
      res.status(200).json({ streams: [] });
      return;
    }

    res.status(200).json({ streams });
  } catch (error) {
    console.error("Error fetching streams:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
