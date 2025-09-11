import { Role } from "@huddle01/server-sdk/auth";
import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

import { generateHuddleAccessToken } from "./huddle.utils";
import { addParticipantToRoom, getRoom } from "./store.redis";
import { isGuest } from "./utils";

export async function joinStream(request: Request, response: Response, next: NextFunction) {
    const { id: roomId } = request.params;
    const { username } = request.body;

    try {
        if (!roomId) throw new HttpError({ message: "roomId is required", code: 403 });
        if (!username) throw new HttpError({ message: "username is required", code: 422 });

        const stream = await prisma.stream.findUnique({
            where: { roomId, status: "LIVE" },
            include: { streamer: { select: { username: true, profileImage: true } } },
        });
        if (!stream) throw new HttpError({ message: "stream not found", code: 404, data: { roomId } });

        let role: Role = "listener";
        let userId: string;
        const roomInRedis = await getRoom(roomId);

        if (isGuest(username)) {
            userId = username;
        } else {
            const user = await prisma.user.findUnique({ where: { username } });
            if (!user) throw new HttpError({ message: "user not found", code: 404, data: { username } });

            userId = user.id;

            if (user.id === roomInRedis.host) role = "host";
            else if (roomInRedis.invitedGuests.includes(user.id)) role = "guest";
        }

        const alreadyInRoom = roomInRedis.participants.some((participant) => participant.id === userId);
        if (!alreadyInRoom) addParticipantToRoom({ role, roomId, userId });

        const token = await generateHuddleAccessToken({ role, roomId });

        response.customResponse({
            code: 200,
            message: `joined stream ${roomId}`,
            data: {
                participants: roomInRedis.participants,
                profileImage: stream.streamer.profileImage,
                role,
                title: stream.title,
                token,
                username: stream.streamer.username,
            },
        });
    } catch (error) {
        next(error);
    }
}
