import { NextFunction, Request, Response } from "express";

import { UserProfile } from "#~/schema/user/index.ts";
import { SERVER_CONSTANTS } from "#config/constants.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { HttpError } from "#middleware/error.ts";

export async function profile(request: Request, response: Response, next: NextFunction) {
    let user = null as null | UserProfile;

    const privyId = request.privyUser?.userId;
    const { userId: username } = request.params;

    const cacheKey = SERVER_CONSTANTS.REDIS_KEYS.USER_PROFILE.KEY({
        id: username ?? (privyId as string),
        isUser: Boolean(username),
    });

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            response.customResponse<UserProfileData>({
                code: 200,
                message: "user profile fetched from cache",
                data: JSON.parse(cached),
            });
            return;
        }

        if (username) {
            user = await prisma.user.findUnique({
                where: { username },
                include: {
                    creatorToken: {
                        select: { address: true },
                    },
                    streams: {
                        where: { status: "SCHEDULED" },
                        select: { id: true, title: true, scheduledAt: true, roomId: true },
                    },
                    holdings: true,
                },
            });
        } else if (privyId) {
            user = await prisma.user.findUnique({
                where: { privyId },
                include: {
                    creatorToken: {
                        select: { address: true },
                    },
                    streams: {
                        where: { status: "SCHEDULED" },
                        select: { id: true, title: true, scheduledAt: true, roomId: true },
                    },
                    holdings: true,
                },
            });
        }

        if (!user) {
            throw new HttpError({ message: "user not found", code: 404, data: { username } });
        }

        const isOwnerRequestingProfile = privyId && privyId === user.privyId;
        const profileData: UserProfileData = {
            bio: user.bio,
            creatorToken: user.creatorToken?.address,
            followerCount: user.followerCount,
            followingCount: user.followingCount,
            holdings: user.holdings,
            profilePicture: user.profileImage,
            scheduledStreams: user.streams,
            username: user.username,
            walletAddress: user.walletAddress,
            ...(isOwnerRequestingProfile && { email: user.email, xUrl: user.xUrl, ytUrl: user.ytUrl }),
        };

        await redis.set(cacheKey, JSON.stringify(profileData), "EX", SERVER_CONSTANTS.REDIS_KEYS.USER_PROFILE.TTL);
        response.customResponse<UserProfileData>({
            code: 200,
            message: "user profile fetched successfully",
            data: profileData,
        });
    } catch (error) {
        next(error);
    }
}
