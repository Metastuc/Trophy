import { Prisma } from "#generated/prisma/index.js";

export type PublicFeed = Prisma.StreamGetPayload<{
    select: {
        id: true;
        roomId: true;
        title: true;
        thumbnail: true;
        viewers: true;
        streamer: {
            select: {
                username: true;
                profileImage: true;
                creatorToken: true;
            };
        };
    };
}>;
