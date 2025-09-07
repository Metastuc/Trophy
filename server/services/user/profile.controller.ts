import { NextFunction, Request, Response } from "express";

import { UserProfile } from "#~/schema/user/index.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function profile(request: Request, response: Response, next: NextFunction) {
    let user = null as null | UserProfile;

    const privyId = request.privyUser?.userId;
    const { userId: username } = request.body;

    try {
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

        const profileData = {
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

        response.customResponse<UserProfileData>({
            code: 200,
            message: "user profile fetched successfully",
            data: profileData,
        });
    } catch (error) {
        next(error);
    }
}
