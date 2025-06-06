import type { Request, Response } from "express";
import { User } from "../models/userSchema";
import { Stream } from "../models/streamSchema";

export const updateProfile = async (req: Request, res: Response) => {
	try {
		const { username, bio } = req.body;

		const user = await User.findOneAndUpdate(
			username,
			{
				$set: {
					bio,
				},
			},
			{ new: true }
		);

		const streams = await Stream.find({
			streamer: username,
			status: "Scheduled",
		});

		res.status(200).json({
			status: "success",
			user,
			streams
		});
	} catch (error) {
		console.error("Error in getProfile:", error);
		res.status(500).json({
			status: "error",
			message:
				error instanceof Error ? error.message : "Failed to get profile data",
		});
	}
};
