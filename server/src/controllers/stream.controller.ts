import type { Request, Response } from "express";
import { API } from "@huddle01/server-sdk/api";
import { CLIENT_URL, HUDDLE_API_KEY } from "../utils/env.js";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Stream } from "../models/streamSchema.js";
import { User } from "../models/userSchema.js";
import { sendScheduleEmail } from "../utils/emailNotis.js";

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
    const { title, date, username } = req.body;

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
      // await sendScheduleEmail({ username, email: user.email }, `📌 ${title} Scheduled!`, calendarProps);
      res.status(201).json({
        roomId,
        message: "Stream scheduled successfully",
      });
    } else {
      newStream.status = "Live";

      const accessToken = new AccessToken({
        apiKey: HUDDLE_API_KEY,
        roomId,
        role: Role.HOST,
        permissions: {
          admin: true,
          canConsume: true,
          canProduce: true,
          canProduceSources: {
            cam: true,
            mic: true,
            screen: true,
          },
          canSendData: true,
        },
      });
      const token = await accessToken.toJwt();
      user.totalStreams += 1;
      await newStream.save();
      await user.save();

      res.status(200).json({
        message: "Room created!",
        roomId,
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
      message: "Room creation failed",
    });
  }
};
