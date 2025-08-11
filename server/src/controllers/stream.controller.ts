import type { Request, Response } from "express";
import { API } from "@huddle01/server-sdk/api";
import { CLIENT_URL, HUDDLE_API_KEY, HUDDLE_PROJECT_ID } from "../utils/env";
import { Stream } from "../models/streamSchema";
import { User } from "../models/userSchema";
import { generateAccessToken } from "./accessToken.controller";
import { sendScheduleEmail } from "../utils/emailNotis";
import { RedisClient } from "../config/db";
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

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "user doesn't exist!" });
      return;
    }

    const api = new API({ apiKey: HUDDLE_API_KEY });

    const { roomId } = await api.createRoom({
      roomLocked: false,
      metadata: JSON.stringify({ title }),
    });

    const newStream = new Stream({ roomId, title, streamer: username });

    if (date) {
      newStream.status = "Scheduled";
      newStream.date = date;

      const dtStamp = formatDate(new Date());
      const dateIsoString = new Date(date).toISOString();
      const calendarDate = formatDate(new Date(dateIsoString));

      const calendarProps = { dtStamp, date: calendarDate, streamTitle: title, streamLink: `${CLIENT_URL}/${roomId}` };

      await newStream.save();

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
      newStream.status = "Live";

      const token = await generateAccessToken(roomId, "host");
      const recordToken = await generateAccessToken(roomId, "bot");
      const liveStreamToken = await generateAccessToken(roomId, "bot");

      user.totalStreams += 1;
      await newStream.save();
      await user.save();

      res.status(200).json({
        message: "Room created!",
        roomId,
        token,
      });

      setTimeout(async () => {
        const { msg } = await recorder.startLivestream({
          roomId,
          token: liveStreamToken,
          rtmpUrls: ["rtmps://ca.pscp.tv:443/x/gw4t5gbe8245"],
        });

        console.log("livestream message:", msg);
      }, 60000);

      // await recorder.startRecording({
      //   roomId,
      //   token: recordToken,
      //   layout: "spotlight"
      // });

      // if (xLive && !ytLive) {
      //   if (user.xUrl) {
      //     await startLiveStream(roomId, liveStreamToken, [user.xUrl]);
      //   }
      // } else if (ytLive && !xLive) {
      //   if (user.ytUrl) {
      //     await startLiveStream(roomId, liveStreamToken, [user.ytUrl]);
      //   }
      // } else if (xLive && ytLive) {
      //   if (user.xUrl && user.ytUrl) {
      //     await startLiveStream(roomId, liveStreamToken, [user.xUrl, user.ytUrl]);
      //   }
      // }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const startLiveStream = async (roomId: string, token: string, rtmpUrls: string[]) => {
  try {
    await recorder.startLivestream({
      roomId,
      token,
      rtmpUrls,
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const stopStream = async (req: Request, res: Response) => {
  try {
    const { roomId, username, viewers } = req.body;

    if (!roomId || username) {
      res.status(400).json({ error: "room id and username is required!" });
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const liveStream = await Stream.findOne({ roomId });
    if (!liveStream) {
      res.status(404).json({ message: "Stream not found!" });
      return;
    }

    if (liveStream.status !== "Live") {
      res.status(400).json({ message: "Stream is not live!" });
      return;
    }

    liveStream.status = "Ended";

    if (user.epicStreams < viewers) {
      user.epicStreams = viewers;
      await user.save();
    }

    await liveStream.save();

    await recorder.stop({ roomId });

    res.status(200).json({ message: "Live stream ended" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
