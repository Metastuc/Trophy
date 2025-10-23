import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";
import { unFollowQueue } from "#services/worker/unfollow.ts";

export async function unfollowUser(request: Request, response: Response, next: NextFunction) {
    const privyId = request.privyUser?.userId;
    const { userId } = request.params;

    try {
        const whoWantsToUnfollow = await prisma.user.findUnique({ where: { privyId } });
        const whoIsToBeUnfollowed = await prisma.user.findUnique({ where: { username: userId } });

        if (!whoWantsToUnfollow || !whoIsToBeUnfollowed)
            return next(new HttpError({ message: "user not found", code: 404, data: { userId } }));

        if (whoWantsToUnfollow?.id === whoIsToBeUnfollowed?.id)
            return next(new HttpError({ message: "You cannot unfollow yourself", code: 400 }));

        const followRecord = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: whoWantsToUnfollow.id,
                    followingId: whoIsToBeUnfollowed.id,
                },
            },
        });

        if (!followRecord) return next(new HttpError({ message: `You are not following ${userId}`, code: 400 }));

        await Promise.all([
            prisma.follow.delete({ where: { id: followRecord.id } }),

            unFollowQueue.add(
                "unfollow-user",
                { whoWantsToUnfollow, whoIsToBeUnfollowed },
                {
                    attempts: 5,
                    backoff: { type: "exponential", delay: 1000 },
                },
            ),
        ]);

        response.customResponse<undefined>({
            code: 200,
            message: "You have successfully unfollowed this user",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
