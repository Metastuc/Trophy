import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";

export async function followStatus(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const privyId = request.privyUser?.userId;

    try {
        const whoWantsToFollow = await prisma.user.findUnique({ where: { privyId } });
        const whoIsToBeFollowed = await prisma.user.findUnique({ where: { username: userId } });

        response.customResponse({
            code: 200,
            message: "Follow status retrieved successfully",
            data: {
                isFollowing: !!(await prisma.follow.findUnique({
                    where: {
                        followerId_followingId: {
                            followerId: whoWantsToFollow?.id as string,
                            followingId: whoIsToBeFollowed?.id as string,
                        },
                    },
                })),
            },
        });
    } catch (error) {
        next(error);
    }
}
