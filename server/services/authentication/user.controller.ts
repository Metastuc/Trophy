import { Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function user(request: Request, response: Response) {
    const privyId = request.privyUser?.userId;
    const user = await prisma.user.findUnique({ where: { privyId } });

    if (!user) {
        throw new HttpError({ message: "user not found", code: 404, data: { privyId } });
    }

    response.customResponse({
        code: 200,
        data: {
            isBasicProfileComplete: Boolean(user.email && user.profileImage && user.username),
            user: { bio: user.bio, email: user.email, profilePicture: user.profileImage, username: user.username },
        },
    });
}
