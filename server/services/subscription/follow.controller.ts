import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function followUser(request: Request, response: Response, next: NextFunction) {
    const privyId = request.privyUser?.userId;
    const { userId } = request.params;

    try {
        const whoWantsToFollow = await prisma.user.findUnique({ where: { privyId } });
        const whoIsToBeFollowed = await prisma.user.findUnique({ where: { username: userId } });

        if (!whoWantsToFollow || !whoIsToBeFollowed) {
            throw new HttpError({ message: "user not found", code: 404, data: { userId } });
        }

        if (whoWantsToFollow?.id === whoIsToBeFollowed?.id) {
            throw new HttpError({ message: "You cannot follow yourself", code: 400 });
        }

        const isAlreadyFollowing = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: whoWantsToFollow.id,
                    followingId: whoIsToBeFollowed.id,
                },
            },
        });

        if (isAlreadyFollowing) {
            throw new HttpError({ message: "You are already following this user", code: 400 });
        }

        const follow = await prisma.follow.create({
            data: {
                followerId: whoWantsToFollow?.id,
                followingId: whoIsToBeFollowed?.id,
            },
        });

        await Promise.all([
            prisma.stats.upsert({
                where: { userId: whoWantsToFollow?.id },
                create: { userId: whoWantsToFollow?.id, followingCount: 1 },
                update: { followingCount: { increment: 1 } },
            }),

            prisma.stats.upsert({
                where: { userId: whoIsToBeFollowed?.id },
                create: { userId: whoIsToBeFollowed?.id, followerCount: 1 },
                update: { followerCount: { increment: 1 } },
            }),

            prisma.notification.create({
                data: {
                    userId: whoIsToBeFollowed?.id,
                    type: "FOLLOW",
                    message: `${whoWantsToFollow?.username} started following you.`,
                    follow: { connect: { id: follow.id } },
                },
            }),
        ]);

        response.customResponse<undefined>({
            code: 201,
            message: "User followed successfully",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
