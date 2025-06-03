import { type Request, type Response } from "express";
import { type TypedResponse } from "../types/response";
import { HUDDLE_KEY } from "../utils/env.js";
import { db } from "../utils/firebase.js";
import { recordStreamJoin } from "./recordListener.controller.js";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Stream } from "../models/streamSchema";
import { format } from "date-fns";

export const getAccessToken = async (req: Request, res: Response) => {
	try {
		const { name, roomId } = req.body;

		if (!roomId || !name) {
			res.status(400).json({
				status: "error",
				message: "Missing roomId or address",
			});
			return;
		}

		// Find the stream from Firestore
		// const streamSnap = await db
		//   .collection("livestreams")
		//   .where("roomId", "==", roomId)
		//   .limit(1)
		//   .get();

		// if (streamSnap.empty) {
		//   res.status(404).json({
		//     status: "error",
		//     message: "Stream not found",
		//   });
		//   return;
		// }

		const stream = await Stream.findOne({ roomId });

		if (!stream) {
			res.status(404).json({
				status: "error",
				message: "Stream not found",
			});
			return;
		}

		// const stream = streamSnap.docs[0].data();
		const now = new Date();
		const startTime = new Date(stream.date!);
		const isOwner = stream.streamer.toLowerCase() === name.toLowerCase();

		// Check if stream hasn't started
		if (startTime > new Date(format(now, "eee dd MMM y p"))) {
			res.status(403).json({
				status: "error",
				message: "Stream has not started yet",
			});
			return;
		}

		// Assign role
		const role: Role = isOwner ? "host" : "listener";

		const permissions = isOwner
			? {
					admin: true,
					canConsume: true,
					canProduce: true,
					canProduceSources: {
						cam: true,
						mic: true,
						screen: true,
					},
					canSendData: true,
					canRecvData: true,
			  }
			: {
					admin: false,
					canConsume: true,
					canProduce: true,
					canRecvData: true,
					canSendData: true,
			  };

		// Generate access token
		const accessToken = new AccessToken({
			apiKey: HUDDLE_KEY,
			roomId,
			role,
			permissions,
		});

		const token = await accessToken.toJwt();

		// await recordStreamJoin(address, roomId);
		res.status(200).json({
			status: "success",
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			message: "Failed to generate access token",
		});
	}
};
