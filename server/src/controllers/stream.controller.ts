import type { Request, Response } from "express";
import { API } from "@huddle01/server-sdk/api";
import { CLIENT_URL, HUDDLE_API_KEY, HUDDLE_PROJECT_ID } from "../utils/env";
import { Stream } from "../models/streamSchema";
import { User } from "../models/userSchema";
import { generateAccessToken } from "./accessToken.controller";
import { sendScheduleEmail } from "../utils/emailNotis";
import { RedisClient, prisma } from "../config/db";
import { Recorder } from "@huddle01/server-sdk/recorder";

export const recorder = new Recorder(HUDDLE_PROJECT_ID, HUDDLE_API_KEY);

const formatDate = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const hours = ("0" + date.getUTCHours()).slice(-2);
  const minutes = ("0" + date.getUTCMinutes()).slice(-2);
  const seconds = ("0" + date.getUTCSeconds()).slice(-2);

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

export const createStream = async (req: Request, res: Response) => {
  try {
    const { title, date, username, xLive, ytLive } = req.body;

    if (!username) {
      res.status(400).json({ error: "Username is required!" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ message: "user doesn't exist!" });
      return;
    }

    const api = new API({ apiKey: HUDDLE_API_KEY });

    const { roomId } = await api.createRoom({
      roomLocked: false,
      metadata: JSON.stringify({ title }),
    });

    if (date) {
      await prisma.stream.create({
        data: {
          roomId,
          title,
          streamer: username,
          pfp: user.userPfp,
          creatorToken: user.creatorToken,
          date,
          status: "Scheduled",
        },
      });

      const dtStamp = formatDate(new Date());
      const dateIsoString = new Date(date).toISOString();
      const calendarDate = formatDate(new Date(dateIsoString));

      const calendarProps = { dtStamp, date: calendarDate, streamTitle: title, streamLink: `${CLIENT_URL}/${roomId}` };

      const streams = await Stream.find({ streamer: username, status: "Scheduled" }).sort({ _id: -1 });
      if (streams.length > 0) {
        await RedisClient.set(`stream:${username}`, JSON.stringify(streams));
      }

      // await sendScheduleEmail({ username, email: user.email }, `📌 ${title} Scheduled!`, calendarProps);
      res.status(201).json({
        roomId,
        message: "Stream scheduled successfully",
      });
    } else {
      await prisma.stream.create({
        data: {
          roomId,
          title,
          streamer: username,
          pfp: user.userPfp,
          creatorToken: user.creatorToken,
          status: "Live",
        },
      });

      const token = await generateAccessToken(roomId, "host");
      const recordToken = await generateAccessToken(roomId, "bot");
      const liveStreamToken = await generateAccessToken(roomId, "bot");

      await prisma.user.update({
        where: { username },
        data: { totalStreams: user.totalStreams + 1, role: "host" },
      });

      res.status(200).json({
        message: "Room created!",
        roomId,
        token,
      });

      if (xLive && !ytLive) {
        if (user.xUrl) {
          await startLivestream(roomId, liveStreamToken, [user.xUrl]);
        }
      } else if (ytLive && !xLive) {
        if (user.ytUrl) {
          await startLivestream(roomId, liveStreamToken, [user.ytUrl]);
        }
      } else if (xLive && ytLive) {
        if (user.xUrl && user.ytUrl) {
          await startLivestream(roomId, liveStreamToken, [user.xUrl, user.ytUrl]);
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
};

const startLivestream = async (roomId: string, token: string, rtmpUrls: string[]) => {
  try {
    const { msg } = await recorder.startLivestream({
      roomId,
      token,
      rtmpUrls,
      recordLivestream: true
    });

    console.log({msg})
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const stopStream = async (req: Request, res: Response) => {
  try {
    const { roomId, username, viewers } = req.body;

    if (!roomId || !username) {
      res.status(400).json({ error: "room id and username is required!" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const liveStream = await prisma.stream.findUnique({ where: { roomId } });
    if (!liveStream) {
      res.status(404).json({ message: "Stream not found!" });
      return;
    }

    if (liveStream.status !== "Live") {
      console.log(liveStream.status)
      res.status(400).json({ message: "Stream is not live!" });
      return;
    }

    const Viewers = Number(viewers);
    if (user.epicStreams < Viewers) {
      await prisma.user.update({
        where: { username },
        data: {
          epicStreams: Viewers,
          role: "viewer"
        },
      });
    }

    await prisma.user.update({
        where: { username },
        data: {
          role: "viewer",
        },
      });

    await prisma.stream.update({
      where: { roomId },
      data: {
        status: "Ended",
      },
    });

    await recorder.stop({ roomId });

    res.status(200).json({ message: "Live stream ended" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error ending stream" });
  }
};
