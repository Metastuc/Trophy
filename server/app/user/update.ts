import { NextFunction, Request, Response } from "express";

import { getUserProfilePicture } from "#app/authentication/utils.ts";
import { SERVER_CONSTANTS } from "#config/constants.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { HttpError } from "#middleware/error.ts";

export async function updateUserProfile(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const profilePictureAsFile = request.file?.buffer;
    const profileUpdateData: Record<string, unknown> = {};

    try {
        for (const field of ["bio", "email", "profileImage", "xUrl", "ytUrl"]) {
            const value = request.body[field];
            if (typeof value === "string" && value.trim() !== "") {
                profileUpdateData[field] = value;
            }
        }

        const userProfilePicture = await getUserProfilePicture({
            profilePicture: request.body.profileImage,
            fileBuffer: profilePictureAsFile,
            fileName: request.file?.originalname,
        });

        if (userProfilePicture) {
            profileUpdateData.profileImage = userProfilePicture;
        }

        if (Object.keys(profileUpdateData).length === 0)
            return next(new HttpError({ message: "No valid fields provided for update", code: 400 }));

        const updatedUser = await prisma.user.update({
            where: { username: userId },
            data: profileUpdateData,
            include: {
                creatorToken: { select: { address: true } },
                streams: {
                    where: { status: "SCHEDULED" },
                    select: { id: true, title: true, scheduledAt: true, roomId: true },
                },
                holdings: true,
                stats: { select: { followerCount: true, followingCount: true } },
            },
        });

        const profileData = {
            bio: updatedUser.bio,
            creatorToken: updatedUser.creatorToken?.address,
            followerCount: updatedUser.stats?.followerCount ?? 0,
            followingCount: updatedUser.stats?.followingCount ?? 0,
            holdings: updatedUser.holdings,
            profilePicture: updatedUser.profileImage,
            scheduledStreams: updatedUser.streams,
            username: updatedUser.username,
            walletAddress: updatedUser.walletAddress,
            email: updatedUser.email,
            xUrl: updatedUser.xUrl,
            ytUrl: updatedUser.ytUrl,
        };

        await Promise.all([
            redis.set(
                SERVER_CONSTANTS.REDIS_KEYS.USER_PROFILE.KEY({
                    id: updatedUser.privyId,
                    isUser: false,
                }),
                JSON.stringify(profileData),
                "EX",
                SERVER_CONSTANTS.REDIS_KEYS.USER_PROFILE.TTL,
            ),

            redis.set(
                SERVER_CONSTANTS.REDIS_KEYS.USER_PROFILE.KEY({
                    id: updatedUser.username,
                    isUser: true,
                }),
                JSON.stringify(profileData),
                "EX",
                SERVER_CONSTANTS.REDIS_KEYS.USER_PROFILE.TTL,
            ),
        ]);

        response.customResponse<undefined>({
            code: 200,
            message: "User profile updated successfully",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
