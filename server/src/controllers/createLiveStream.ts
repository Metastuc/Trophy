import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { createLivepeerStream } from "../config/livepeer";

export async function createLiveStream(request: Request, response: Response) {
  try {
    const { date, title, username } = request.body;

    const user = await User.findOne({ username });
    if (!user) {
      response.status(404).json({ message: "user does not exist!" });
      return;
    }

    if (!title) {
      response.status(400).json({ message: "title is required" });
      return;
    }

    createLivepeerStream({ name: title });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: (error as Error).message,
      message: "Room creation failed",
    });
  }
}
