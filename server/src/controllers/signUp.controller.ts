import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';

export const signUp = async (
    req: Request,
    res: Response<TypedResponse<{ message?: string }>>
): Promise<void> => {
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
            username?: string;
            email?: string;
            bio?: string;
            farcaster?: string;
            address?: string;
        } = req.body;

        const uploadedPfp = pfp ?? "url"; // Default fallback

        const userData = {
            uploadedPfp,
            username: username ?? "",
            email: email ?? "",
            bio: bio ?? "",
            farcaster: farcaster ?? "",
            address: address ?? "",
            totalStreams: 0
        };

        await db.collection('users').add(userData);

        console.log("user signed up:", userData);

        res.status(201).json({
            status: "success",
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
