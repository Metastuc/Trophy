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
