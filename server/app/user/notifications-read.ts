import { NextFunction, Request, Response } from "express";

import { SERVER_CONSTANTS } from "#config/constants.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { HttpError } from "#middleware/error.ts";

export async function markNotificationsAsRead(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const cacheKey = SERVER_CONSTANTS.REDIS_KEYS.NOTIFICATIONS.KEY(userId);

    try {
        const user = await prisma.user.findUnique({ where: { username: userId } });
        if (!user) throw new HttpError({ code: 404, message: "User not found" });

        await Promise.all([
            prisma.user.update({
                where: { id: user.id },
                data: { lastReadAt: new Date() },
                select: { id: true, lastReadAt: true },
            }),

            redis.del(cacheKey),
        ]);

        response.customResponse<undefined>({
            code: 202,
            data: undefined,
            message: "Notifications marked as read",
        });
    } catch (error) {
        next(error);
    }
}
