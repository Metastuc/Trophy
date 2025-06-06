import type { Request, Response } from "express";
import { sendRegisterEmail } from "../utils/emailNotis";
import { User } from "../models/userSchema";

export const signUp = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            pfp,
            username,
            email,
            bio,
            farcaster,
            address
        }: {
            pfp?: string;
            username: string;
            email: string;
            bio?: string;
            farcaster?: string;
            address: string;
        } = req.body;

        const userPfp = pfp ?? "url"; // Default fallback

        const userData = {
            userPfp,
            username,
            email,
            bio: bio ?? "",
            farcaster: farcaster ?? "",
            address
        };

        const newUser = new User(userData);
        await newUser.save();

        await sendRegisterEmail({ email, username }, "Welcome to Trophy 🎉")

        res.status(201).json({
            user: newUser,
            message: "User signed up successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create user",
        });
    }
};