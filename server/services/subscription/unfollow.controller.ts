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

        await prisma.follow.delete({ where: { id: followRecord.id } });

        const [unfollowerStats, unfollowedStats] = await Promise.all([
            prisma.stats.findUnique({ where: { userId: whoWantsToUnfollow.id } }),
            prisma.stats.findUnique({ where: { userId: whoIsToBeUnfollowed.id } }),
        ]);

        await Promise.all([
            prisma.stats.upsert({
                where: { userId: whoWantsToUnfollow.id },
                create: { userId: whoWantsToUnfollow.id, followingCount: 0 },
                update: {
                    followingCount: { decrement: unfollowerStats && unfollowerStats.followingCount > 0 ? 1 : 0 },
                },
            }),

            prisma.stats.upsert({
                where: { userId: whoIsToBeUnfollowed.id },
                create: { userId: whoIsToBeUnfollowed.id, followerCount: 0 },
                update: { followerCount: { decrement: unfollowedStats && unfollowedStats.followerCount > 0 ? 1 : 0 } },
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
