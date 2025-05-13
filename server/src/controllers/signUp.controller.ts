import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';

export const signUp = async (
    req: Request,
    res: Response<TypedResponse<{ message?: string }>>
): Promise<void> => {
    try {
        const { pfp, username, email, bio, farcaster, address } = req.body;

        const uploadedPfp = "url";

        const userData = {
            uploadedPfp,
            username,
            email,
            bio,
            farcaster,
            address
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
}