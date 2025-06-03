import type { Request, Response } from "express";
import { API } from "@huddle01/server-sdk/api";
import { HUDDLE_KEY } from "../utils/env.js";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Stream } from "../models/streamSchema.js";
import { User } from "../models/userSchema.js";

export const createStream = async (req: Request, res: Response) => {
	try {
		const { title, date, username } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			res.status(404).json({ error: "user doesn't exist!" });
			return;
		}

		const api = new API({ apiKey: HUDDLE_KEY });

		const { roomId } = await api.createRoom({
			roomLocked: false,
			metadata: JSON.stringify({ title }),
		});

		const newStream = new Stream({ roomId, title, streamer: username });

		if (date) {
			newStream.status = "Scheduled";
			newStream.date = date;

			await newStream.save();
			res.status(201).json({
				roomId,
				message: "Stream scheduled successfully",
			});
		} else {
			newStream.status = "Live";

			const accessToken = new AccessToken({
				apiKey: HUDDLE_KEY,
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
				status: "success",
				roomId,
				token
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			message: "Room creation failed",
		});
	}
};
