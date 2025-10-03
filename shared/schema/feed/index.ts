import { z } from "zod";

import { Prisma } from "#generated/prisma/client.ts";

export const publicFeedSelectFields = {
    id: true,
    roomId: true,
    streamer: {
        select: {
            creatorToken: {
                select: {
                    address: true,
                },
            },
            profileImage: true,
            username: true,
        },
    },
    thumbnail: true,
    title: true,
    viewers: true,
};

export type PublicFeed = Prisma.StreamGetPayload<{
    select: typeof publicFeedSelectFields;
}>;

export const FEED_RESPONSE_SCHEMA = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            roomId: z.string(),
            streamer: z.object({
                creatorToken: z
                    .object({
                        address: z.string(),
                    })
                    .nullable(),
                profileImage: z.string().nullable(),
                username: z.string(),
            }),
            thumbnail: z.string().nullable(),
            title: z.string(),
            viewers: z.number(),
        }),
    ),
    pagination: z.object({
        hasNext: z.boolean(),
        limit: z.number(),
        page: z.number(),
        total: z.number(),
    }),
});
