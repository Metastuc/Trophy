import { NextFunction, Request, Response } from "express";

import { CREATED_STREAM_RESPONSE_SCHEMA } from "#~/schema/stream/index.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

import { createHuddleRoom, generateHuddleAccessToken, startHuddleStream } from "./huddle.utils";
import { createRoomInRedis } from "./redis.utils";

export async function createStream(request: Request, response: Response, next: NextFunction) {
    const { date, title, username } = request.body;

    const urls: Array<string> = [];
    const isStreamScheduled = Boolean(date);

    try {
        if (!username) {
            throw new HttpError({ message: "username is required", code: 400 });
        }

        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            throw new HttpError({ message: "user not found", code: 404, data: { username } });
        }

        const roomId = await createHuddleRoom(title);

        if (isStreamScheduled) {
            await prisma.stream.create({
                data: { roomId, scheduledAt: date, status: "SCHEDULED", streamerId: user.id, title },
            });

            response.customResponse<ScheduledStreamData>({
                code: 201,
                message: "stream scheduled succesfully",
                data: { roomId },
            });
            return;
        } else {
            await prisma.stream.create({
                data: { roomId, status: "LIVE", streamerId: user.id, title, startedAt: new Date() },
            });

            const roomAccessToken = await generateHuddleAccessToken({ roomId, role: "host" });
            const liveStreamAccessToken = await generateHuddleAccessToken({ roomId, role: "bot" });

            if (user.xUrl) urls.push(user.xUrl);
            if (user.ytUrl) urls.push(user.ytUrl);

            if (urls.length && urls.length > 0) {
                await startHuddleStream({ roomId, rtmpUrls: urls, token: liveStreamAccessToken });
            }

            await Promise.all([
                prisma.stats.update({
                    where: { userId: user.id },
                    data: { totalStreams: { increment: 1 } },
                }),

                createRoomInRedis({ hostId: user.id, roomId }),
            ]);

            response.customResponse<CreatedStreamData>({
                code: 201,
                message: "stream created successfully",
                data: CREATED_STREAM_RESPONSE_SCHEMA.parse({
                    roomId,
                    token: roomAccessToken,
                }),
            });
        }
    } catch (error) {
        next(error);
    }
}
