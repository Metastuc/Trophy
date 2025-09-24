import { NextFunction, Request, Response } from "express";

import { PublicFeed, publicFeedSelectFields } from "#~/schema/feed/index.ts";
import { prisma } from "#config/prisma.ts";

export async function publicFeedContent(_request: Request, response: Response, next: NextFunction) {
    try {
        const liveStreams: Array<PublicFeed> = await prisma.stream.findMany({
            where: { status: "LIVE" },
            orderBy: { startedAt: "desc" },
            select: publicFeedSelectFields,
        });

        response.customResponse<Array<PublicFeed>>({
            code: 200,
            message: "public feed content fetched successfully",
            data: liveStreams,
        });
    } catch (error) {
        next(error);
    }
}
