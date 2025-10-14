import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";
import { endRoomInRedis } from "#services/redis/room.ts";

export async function endStream(request: Request, response: Response, next: NextFunction) {
    const { id: roomId } = request.params;
    const { username } = request.body;

    try {
        if (!roomId) throw new HttpError({ message: "roomId is required", code: 403 });
        if (!username) throw new HttpError({ message: "username is required", code: 422 });

        const stream = await prisma.stream.findUnique({
            where: { roomId, status: "LIVE" },
            include: { streamer: true },
        });
        if (!stream) throw new HttpError({ message: "stream not found or not live", code: 404 });

        if (stream.streamer.username !== username) {
            throw new HttpError({ message: "Only host can end the stream", code: 403 });
        }

        await prisma.stream.update({
            where: { id: stream.id },
            data: { status: "ENDED", endedAt: new Date() },
        });

        await endRoomInRedis({ roomId, walletAddress: stream.streamer.walletAddress, hostId: username });

        response.customResponse<undefined>({
            code: 200,
            message: "stream ended successfully",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
