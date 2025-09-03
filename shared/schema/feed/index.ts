import { Prisma } from "#generated/prisma/index.js";

export const publicFeedSelectFields = {
    id: true,
    roomId: true,
    title: true,
    thumbnail: true,
    viewers: true,
    streamer: {
        select: {
            username: true,
            profileImage: true,
            creatorToken: true,
        },
    },
};

export type PublicFeed = Prisma.StreamGetPayload<{
    select: typeof publicFeedSelectFields;
}>;
