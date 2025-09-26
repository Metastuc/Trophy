import {
    differenceInCalendarWeeks,
    format,
    isThisWeek,
    isToday,
    isYesterday,
    parseISO,
    startOfWeek,
    subDays,
} from "date-fns";
import { NextFunction, Request, Response } from "express";

import { USER_NOTIFICATIONS_RESPONSE_SCHEMA } from "#~/schema/user/index.ts";
import { SERVER_CONSTANTS } from "#config/constants.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";

export async function notifications(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const cacheKey = SERVER_CONSTANTS.REDIS_KEYS.NOTIFICATIONS.KEY(userId);
    const cutoff = subDays(new Date(), 14);

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            response.customResponse({
                code: 200,
                data: JSON.parse(cached),
                message: "Notifications fetched from cache",
            });
            return;
        }

        const notifications = await prisma.notification.findMany({
            where: {
                user: { username: userId },
                createdAt: { gte: cutoff },
            },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                type: true,
                createdAt: true,
                follow: {
                    select: {
                        follower: {
                            select: { username: true, profileImage: true },
                        },
                    },
                },
                tip: {
                    select: {
                        tipper: { select: { username: true, profileImage: true } },
                        amount: true,
                        token: true,
                    },
                },
            },
        });

        const grouped = notifications.reduce(
            function (all, { createdAt, ...rest }) {
                let label: string;

                const parsedDate = parseISO(createdAt.toISOString());
                const key = format(startOfWeek(parsedDate), "yyyy-MM-dd");

                if (isToday(parsedDate)) label = "Today";
                else if (isYesterday(parsedDate)) label = "Yesterday";
                else if (isThisWeek(parsedDate)) label = "This Week";
                else {
                    const weeksDifference = differenceInCalendarWeeks(new Date(), parsedDate);
                    if (weeksDifference === 1) label = "Last week";
                    else if (weeksDifference < 4) label = `${weeksDifference} weeks ago`;
                    else label = format(parsedDate, "MMMM d, yyyy");
                }

                if (!all[key]) all[key] = { date: key, label, items: [] };
                all[key].items.push(rest);
                return all;
            },
            {} as Record<string, { date: string; label: string; items: Array<unknown> }>,
        );

        const timeline = Object.values(grouped);
        const responsePayload = USER_NOTIFICATIONS_RESPONSE_SCHEMA.parse(timeline);
        await redis.set(cacheKey, JSON.stringify(responsePayload), "EX", SERVER_CONSTANTS.REDIS_KEYS.NOTIFICATIONS.TTL);

        response.customResponse({
            code: 200,
            data: responsePayload,
            message: "Notifications fetched successfully",
        });
    } catch (error) {
        next(error);
    }
}
