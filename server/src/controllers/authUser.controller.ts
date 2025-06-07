import { type Request, type Response } from "express";
import { User } from "../models/userSchema";

export const authUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ error: "user doesn't exist!" });
            return;
        }

        res.status(200).json({
            message: "user fetched",
            user,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Failed to authenticate user",
            error: error.message,
        });
    }
};
