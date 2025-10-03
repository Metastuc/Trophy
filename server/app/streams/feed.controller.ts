import { NextFunction, Request, Response } from "express";

import { FEED_RESPONSE_SCHEMA, publicFeedSelectFields } from "#~/schema/feed/index.ts";
import { prisma } from "#config/prisma.ts";

export async function publicFeedContent(request: Request, response: Response, next: NextFunction) {
    try {
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [liveStreams, total] = await Promise.all([
            prisma.stream.findMany({
                where: { status: "LIVE" },
                orderBy: { startedAt: "desc" },
                skip,
                take: limit,
                select: publicFeedSelectFields,
            }),

            prisma.stream.count({
                where: { status: "LIVE" },
            }),
        ]);

        response.customResponse<PublicFeedData>({
            code: 200,
            message: "public feed content fetched successfully",
            data: FEED_RESPONSE_SCHEMA.parse({
                items: liveStreams,
                pagination: {
                    hasNext: page * limit < total,
                    limit,
                    page,
                    total,
                },
            }),
        });
    } catch (error) {
        next(error);
    }
}
