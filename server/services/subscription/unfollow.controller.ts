import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function unfollowUser(request: Request, response: Response, next: NextFunction) {
    const privyId = request.privyUser?.userId;
    const { userId } = request.params;

    try {
        const whoWantsToUnfollow = await prisma.user.findUnique({ where: { privyId } });
        const whoIsToBeUnfollowed = await prisma.user.findUnique({ where: { username: userId } });

        if (!whoWantsToUnfollow || !whoIsToBeUnfollowed) {
            throw new HttpError({ message: "user not found", code: 404, data: { userId } });
        }

        if (whoWantsToUnfollow?.id === whoIsToBeUnfollowed?.id) {
            throw new HttpError({ message: "You cannot unfollow yourself", code: 400 });
        }

        const followRecord = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: whoWantsToUnfollow.id,
                    followingId: whoIsToBeUnfollowed.id,
                },
            },
        });

        if (!followRecord) {
            throw new HttpError({ message: "You are not following this user", code: 400 });
        }

        await prisma.follow.delete({
            where: { id: followRecord.id },
        });

        await Promise.all([
            prisma.stats.update({
                where: { userId: whoWantsToUnfollow.id },
                data: { followingCount: { decrement: 1 } },
            }),

            prisma.stats.update({
                where: { userId: whoIsToBeUnfollowed.id },
                data: { followerCount: { decrement: 1 } },
            }),
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
