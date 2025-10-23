import { NextFunction, Request, Response } from "express";

import { ONBOARD_USER_RESPONSE_SCHEMA } from "#~/schema/user/index.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";
import { sendUserRegisteredEmail } from "#services/email/register.ts";

import { getUserProfilePicture, validateUsername } from "./utils";

export async function onBoard(request: Request, response: Response, next: NextFunction) {
    const profilePictureAsFile = request.file?.buffer;
    const privyId = request.privyUser?.userId as string;
    const { bio, email, username, profilePicture, walletAddress, fc } = request.body;

    try {
        const isUserExisting = await prisma.user.findUnique({ where: { privyId } });
        if (isUserExisting) return next(new HttpError({ message: "user already exists", code: 400 }));

        const usernameRegex = validateUsername({ fc, username });
        const usernameExists = await prisma.user.findUnique({ where: { username: usernameRegex } });
        if (usernameExists) return next(new HttpError({ message: "username already exists", code: 400 }));

        const emailExists = await prisma.user.findUnique({ where: { email } });
        if (emailExists) return next(new HttpError({ message: "email already exists", code: 400 }));

        const userProfilePicture = await getUserProfilePicture({
            profilePicture,
            fileBuffer: profilePictureAsFile,
            fileName: request.file?.originalname,
        });

        const user = await prisma.user.create({
            data: {
                privyId,
                username: usernameRegex,
                walletAddress,
                bio,
                email,
                ...(userProfilePicture && { profileImage: userProfilePicture }),
            },
        });

        sendUserRegisteredEmail({ email: user.email, username: user.username });
        response.customResponse<OnboardUserData>({
            code: 201,
            message: "user created successfully",
            data: ONBOARD_USER_RESPONSE_SCHEMA.parse({
                isBasicProfileComplete: Boolean(user.email && user.profileImage && user.username),
            }),
        });
    } catch (error) {
        next(error);
    }
}
