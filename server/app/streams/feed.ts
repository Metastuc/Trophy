import { NextFunction, Request, Response } from "express";

import { FEED_RESPONSE_SCHEMA, publicFeedSelectFields } from "#~/schema/feed/index.ts";
import { SERVER_CONSTANTS } from "#config/constants.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";

export async function publicFeedContent(request: Request, response: Response, next: NextFunction) {
    try {
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const cacheKey = `${SERVER_CONSTANTS.REDIS_KEYS.FEED.PUBLIC.key}:page=${page}:limit=${limit}`;
        const cached = await redis.get(cacheKey);

        if (cached) {
            response.customResponse<PublicFeedData>({
                code: 200,
                message: "public feed content fetched from cache",
                data: FEED_RESPONSE_SCHEMA.parse(JSON.parse(cached)),
            });
            return;
        }

        const [liveStreams, total] = await Promise.all([
            prisma.stream.findMany({
                where: { status: "LIVE" },
                orderBy: { startedAt: "desc" },
                skip,
                take: limit,
                select: publicFeedSelectFields,
            }),

            prisma.stream.count({ where: { status: "LIVE" } }),
        ]);

        const payload = FEED_RESPONSE_SCHEMA.parse({
            items: liveStreams,
            pagination: {
                hasNext: page * limit < total,
                limit,
                page,
                total,
            },
        });

        await redis.setex(cacheKey, SERVER_CONSTANTS.REDIS_KEYS.FEED.PUBLIC.ttl, JSON.stringify(payload));

        response.customResponse<PublicFeedData>({
            code: 200,
            message: "public feed content fetched successfully",
            data: payload,
        });
    } catch (error) {
        next(error);
    }
}
