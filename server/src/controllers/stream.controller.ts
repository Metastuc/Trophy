import type { Request, Response } from "express";
import { API } from "@huddle01/server-sdk/api";
import { CLIENT_URL, HUDDLE_API_KEY } from "../utils/env.js";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Stream } from "../models/streamSchema.js";
import { User } from "../models/userSchema.js";
import { sendScheduleEmail } from "../utils/emailNotis.js";
import { RedisClient } from "../config/db.js";
import Janus from "janus-gateway";
import ws from "ws";

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
    const { title, date, username, liveStream } = req.body;

    if (!username) {
      res.status(400).json({ error: "Username is required!" });
      return
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

      setTimeout(async () => {
        await startLiveStream(roomId, user.streamKey, "rtmps://ca.pscp.tv:443/x/gw4t5gbe8245", user.YTUrl)
      }, 30000)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
    });
  }
};

let janusClient: Janus | undefined = undefined;

export const startLiveStream = async (room: string, streamKey: string, xUrl: string | null | undefined, ytUrl: string | null | undefined) => {
  try {
    return new Promise((resolve, reject) => {

      if (!janusClient) {
        Janus.init({ debug: "all" });

        janusClient = new Janus({
          server: "wss://zcgw8oook4wsc4gc4k8s0og4.31.97.115.84.sslip.io:8088",
          success: () => console.log("Janus client initialized successfully"),
          error: (error: any) => {
            console.error("Error initializing Janus client:", error);
            throw new Error("Failed to initialize Janus client");
          },
        })
      }

      janusClient.attach({
        plugin: "janus.plugin.videoroom",
        success: (pluginHandle: any) => {

          pluginHandle.send({
            message: {
              request: "join",
              room,
              ptype: "publisher",
              display: streamKey
            },
            success: () => {
              pluginHandle.createOffer({
                media: { audio: true, video: true },
                success: (jsep: any) => {
                  const rtmpUrl = `rtmp://localhost/live/${streamKey}?yt_url=${encodeURIComponent(ytUrl || '')}&x_url=${encodeURIComponent(xUrl || '')}`;
                  pluginHandle.send({
                    message: {
                      request: 'configure',
                      audio: true,
                      video: true,
                      rtmp: { url: rtmpUrl }
                    },
                    jsep,
                    success: async () => {
                      await RedisClient.set(streamKey, JSON.stringify({ pluginHandle }));
                    },
                    error: reject
                  });
                },
                error: reject
              });
            },
            error: reject
          });
        },
        error: reject
      })
    });
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const stopStream = async (req: Request, res: Response) => {
  try {
    const { roomId, username } = req.body;

    if (!roomId || username) {
      res.status(400).json({ error: "room id and username is required!" });
      return;
    }

    const userFetch = await RedisClient.get(`user:${username}`);
    const { streamKey } = JSON.parse(userFetch!)

    const liveStream = await Stream.findOne({ roomId });
    if (!liveStream) {
      res.status(404).json({ message: "Stream not found!" });
      return;
    }

    if (liveStream.status !== "Live") {
      res.status(400).json({ message: "Stream is not live!" });
      return;
    }

    await stopLiveStream(streamKey);

    liveStream.status = "Ended";
    await liveStream.save();

    res.status(200).json({ message: "Live stream ended" });
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

async function stopLiveStream(streamKey: string): Promise<void> {
  const session = await RedisClient.get(streamKey);
  if (!session) return;

  const { pluginHandle } = JSON.parse(session);
  pluginHandle.send({
    message: { request: 'leave' },
    success: () => {
      pluginHandle.detach({
        success: async () => {
          await RedisClient.del(streamKey);
          console.log(`Stream ${streamKey} stopped`);
        }
      });
    }
  });
}
