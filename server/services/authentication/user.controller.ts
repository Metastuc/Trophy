import { NextFunction, Request, Response } from "express";

import { AUTHENTICATE_USER_RESPONSE_SCHEMA } from "#~/schema/user/index.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function user(request: Request, response: Response, next: NextFunction) {
    const privyId = request.privyUser?.userId;

    try {
        const user = await prisma.user.findUnique({ where: { privyId }, include: { creatorToken: true } });

        if (!user) {
            throw new HttpError({ message: "user not found", code: 404, data: { privyId } });
        }

        response.customResponse<AuthenticateUserData>({
            code: 200,
            data: AUTHENTICATE_USER_RESPONSE_SCHEMA.parse({
                isBasicProfileComplete: Boolean(user.email && user.profileImage && user.username),
                user: {
                    bio: user.bio,
                    creatorToken: user.creatorToken?.address,
                    email: user.email,
                    profilePicture: user.profileImage,
                    username: user.username,
                },
            }),
        });
    } catch (error) {
        next(error);
    }
}
