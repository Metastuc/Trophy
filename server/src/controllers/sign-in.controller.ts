import type { Request, Response } from "express";
import { iUser, User } from "../models/userSchema";
import { sendRegisterEmail } from "../utils/emailNotis";

export const signIn = async (req: Request, res: Response) => {
    let _user: iUser | null;

    try {
        const { userPfp, username, email, privyId, bio } = req.body;

        if (!privyId) {
            return res.status(400).json({
                status: "error",
                message: "privyId is required",
            });
        }

        _user = await User.findOne({ privyId });

        if (!_user) {
            if (!userPfp || !username || !email) {
                return res.status(400).json({
                    status: "error",
                    message: "userPfp, username, and email are required",
                });
            }

            _user = await User.create({ privyId, userPfp, username, email, bio });
            // await sendRegisterEmail({ email, username }, "Welcome to Trophy 🎉");

            return res.status(201).json({
                status: "success",
                data: {
                    isBasicProfileComplete: true,
                },
            });
        }

        const _fieldsToUpdate: Partial<iUser> = {
            email: email || _user.email,
            userPfp: userPfp || _user.userPfp,
            username: username || _user.username,
            bio: bio || _user.bio,
        };

        const _needsUpdate = Object.entries(_fieldsToUpdate).some(([key, value]) => {
            const userKey = key as keyof iUser;
            return value !== (_user?.[userKey] ?? value);
        });

        if (_needsUpdate) {
            Object.assign(_user, _fieldsToUpdate);
            await _user.save();
        }

        return res.status(200).json({
            status: "success",
            data: {
                isBasicProfileComplete: !!(_user.email && _user.userPfp && _user.username),
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Failed to authenticate user",
        });
    }
};
