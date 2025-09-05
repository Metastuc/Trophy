import { NextFunction, Request, Response } from "express";

import { saveProfileImage } from "#config/images.utils.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";
import { sendUserRegisteredEmail } from "#services/notifications/email/register.ts";

export async function onBoard(request: Request, response: Response, next: NextFunction) {
    const userProfilePicture = request.file?.buffer;
    const privyId = request.privyUser?.userId as string;
    const { bio, email, username, profilePicture, walletAddress, fc } = request.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { privyId } });
        if (!existingUser) {
            if (!username) {
                throw new HttpError({ message: "username is required", code: 422 });
            }

            let usernameRegex = "";
            const formatRegex = /[ _-]/g;
            const usernameFormat = formatRegex.test(username);

            if (fc !== "false") {
                usernameRegex = username.replace(formatRegex, "");
            } else {
                if (usernameFormat) {
                    throw new HttpError({ message: "username cannot have space, underscore or hypens", code: 403 });
                }

                usernameRegex = username;
            }

            const usernameExists = await prisma.user.findUnique({ where: { username: usernameRegex } });
            if (usernameExists) {
                throw new HttpError({ message: "username already exists", code: 400 });
            }

            const emailExists = await prisma.user.findUnique({ where: { email } });
            if (emailExists) {
                throw new HttpError({ message: "email already exists", code: 400 });
            }

            let userPfp;

            if (userProfilePicture) {
                userPfp = await saveProfileImage({
                    file: userProfilePicture,
                    name: request.file?.originalname as string,
                });
            } else if (profilePicture && profilePicture !== "default-pfp.svg") {
                userPfp = profilePicture;
            } else {
                userPfp = undefined;
            }

            const user = await prisma.user.create({
                data: { bio, email, privyId, username: usernameRegex, walletAddress, ...(userPfp && { userPfp }) },
            });

            sendUserRegisteredEmail({ email: user.email as string, username: user.username });
            response.customResponse<OnboardUserData>({
                code: 201,
                message: "user created successfully",
                data: {
                    isBasicProfileComplete: Boolean(user?.email && user?.profileImage && user?.username),
                },
            });
        }
    } catch (error) {
        next(error);
    }
}
