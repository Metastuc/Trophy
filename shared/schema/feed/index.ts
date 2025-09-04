import { Prisma } from "#generated/prisma/index.js";

export const publicFeedSelectFields = {
    id: true,
    roomId: true,
    streamer: {
        select: {
            creatorToken: true,
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
