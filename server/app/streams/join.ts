import { Role } from "@huddle01/server-sdk/auth";
import { NextFunction, Request, Response } from "express";

import { JOIN_STREAM_RESPONSE_SCHEMA } from "#~/schema/stream/index.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";
import { addParticipantToRoom, getRoom } from "#services/redis/room.ts";

import { generateHuddleAccessToken, isGuest } from "./utils";

export async function joinStream(request: Request, response: Response, next: NextFunction) {
    const { id: roomId } = request.params;
    const { username } = request.body;

    try {
        if (!roomId) return next(new HttpError({ message: "roomId is required", code: 403 }));
        if (!username) return next(new HttpError({ message: "username is required", code: 422 }));

        const stream = await prisma.stream.findUnique({
            where: { roomId, status: "LIVE" },
            include: {
                streamer: {
                    select: {
                        username: true,
                        profileImage: true,
                        creatorToken: { select: { address: true } },
                        walletAddress: true,
                    },
                },
            },
        });
        if (!stream) return next(new HttpError({ message: "stream not found", code: 404, data: { roomId } }));

        const roomInRedis = await getRoom(roomId);
        let role: Role = "listener";
        let user;
        let userId: string;

        if (isGuest(username)) {
            userId = username;
        } else {
            user = await prisma.user.findUnique({ where: { username } });
            if (!user) return next(new HttpError({ message: "user not found", code: 404, data: { username } }));

            userId = user.username;

            if (userId === roomInRedis.host) role = "host";
            else if (roomInRedis.invitedGuests.includes(userId)) role = "guest";
        }

        const alreadyInRoom = roomInRedis.participants.some((participant) => participant.id === userId);
        if (!alreadyInRoom)
            addParticipantToRoom({
                role,
                roomId,
                id: userId,
                peerId: undefined,
                profileImage: isGuest(userId) ? null : (user?.profileImage ?? null),
                isGuest: isGuest(userId),
            });

        const token = await generateHuddleAccessToken({ role, roomId });

        response.customResponse<JoinStreamData>({
            code: 200,
            message: `joined stream ${roomId}`,
            data: JOIN_STREAM_RESPONSE_SCHEMA.parse({
                creatorProfileImage: stream.streamer.profileImage,
                creatorToken: stream.streamer.creatorToken?.address,
                creatorUsername: stream.streamer.username,
                creatorWalletAddress: stream.streamer.walletAddress,
                role,
                title: stream.title,
                token,
            }),
        });
    } catch (error) {
        next(error);
    }
}
