import type { Request, Response } from "express";
import { Stream } from "../models/streamSchema";
import { recorder } from "./stream.controller";
import { FdummyData } from "../utils/utils";

export const fetchStreams = async (req: Request, res: Response) => {
  try {
    const streams = await Stream.find({ status: "Live", thumbnails: { $exists: true, $ne: null } }).sort({
      createdAt: -1,
    });

    const { data, error } = await recorder.getRecordings();
    const recorded = data?.recordings ? data.recordings : [];

    if (streams.length === 0) {
      if (error) {
        res.status(200).json({ streams: { live: [], recorded }, dummyData: FdummyData });

        return;
      } else {
        res.status(200).json({ streams: { live: [], recorded }, dummyData: FdummyData });

        return;
      }
    }

    res.status(200).json({ streams: { live: streams, recorded }, dummyData: FdummyData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
