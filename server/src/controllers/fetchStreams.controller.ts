import type { Request, Response } from "express";
import { Stream } from "../models/streamSchema";
import { recorder } from "./stream.controller";
import { FdummyData } from "../utils/utils";
import { prisma } from "../config/db";

export const fetchStreams = async (req: Request, res: Response) => {
  try {
    const streams = await await prisma.stream.findMany({
      where: {
        status: "Live",
        thumbnail: {
          not: null,
        },
      },
      orderBy: {
        date: "desc",
      },
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
