import { Role } from "@huddle01/server-sdk/auth";
import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

import { generateHuddleAccessToken } from "./huddle.utils";
import { addParticipantToRoom, getRoom } from "./store.redis";

export async function joinStream(request: Request, response: Response, next: NextFunction) {
    let role: Role = "listener";
    const { id: roomId } = request.params;
    const { username } = request.body;

    try {
        if (!roomId) throw new HttpError({ message: "roomId is required", code: 403 });
        if (!username) throw new HttpError({ message: "username is required", code: 422 });

        const stream = await prisma.stream.findUnique({
            where: { roomId },
            include: { streamer: { select: { username: true, profileImage: true } } },
        });
        if (!stream) throw new HttpError({ message: "stream not found", code: 404, data: { roomId } });

        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) throw new HttpError({ message: "user not found", code: 404, data: { username } });

        const roomInRedis = await getRoom(roomId);
        if (user.id === roomInRedis.host) role = "host";
        else if (roomInRedis.invitedGuests.includes(user.id)) role = "guest";

        const alreadyInRoom = roomInRedis.participants.some((participant) => participant.id === user.id);
        if (!alreadyInRoom) addParticipantToRoom({ role, roomId, userId: user.id });

        const token = await generateHuddleAccessToken({ role, roomId });

        response.customResponse({
            code: 200,
            message: `joined stream ${roomId}`,
            data: {
                profileImage: stream.streamer.profileImage,
                role,
                title: stream.title,
                token,
                username: stream.streamer.username,
                participants: roomInRedis.participants,
            },
        });
    } catch (error) {
        next(error);
    }
}
