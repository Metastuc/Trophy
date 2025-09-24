import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

import { followQueue } from "./follow.worker";

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

        if (
            await prisma.follow.findUnique({
                where: {
                    followerId_followingId: { followerId: whoWantsToFollow.id, followingId: whoIsToBeFollowed.id },
                },
            })
        ) {
            throw new HttpError({ message: `You are already following ${userId}`, code: 400 });
        }

        const follow = await prisma.follow.create({
            data: {
                followerId: whoWantsToFollow?.id,
                followingId: whoIsToBeFollowed?.id,
            },
        });

        await followQueue.add(
            "follow-user",
            { follow, whoWantsToFollow, whoIsToBeFollowed },
            {
                attempts: 5,
                backoff: { type: "exponential", delay: 1000 },
            },
        );

        response.customResponse<undefined>({
            code: 201,
            message: "User followed successfully",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
