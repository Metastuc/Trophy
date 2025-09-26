import { isAddress } from "viem";
import { z } from "zod";

import { Prisma } from "#generated/prisma/client.ts";

export const AUTHENTICATE_USER_RESPONSE_SCHEMA = z.object({
    isBasicProfileComplete: z.boolean(),
    user: z.object({
        bio: z.string().nullable(),
        creatorToken: z
            .string()
            .refine((value) => isAddress(value), { message: "Invalid address" })
            .nullable(),
        email: z.email().nullable(),
        profilePicture: z.string().nullable(),
        username: z.string(),
    }),
});

export const ONBOARD_USER_RESPONSE_SCHEMA = z.object({
    isBasicProfileComplete: z.boolean(),
});

export const WALLET_TOKEN_BALANCES_RESPONSE_SCHEMA = z.array(
    z.object({
        address: z.string().refine((value) => isAddress(value), { message: "Invalid address" }),
        balance: z.string(),
        icon: z.string(),
        name: z.string(),
        symbol: z.string(),
    }),
);

export const USER_NOTIFICATIONS_RESPONSE_SCHEMA = z.array(
    z.object({
        date: z.string(),
        label: z.string(),
        items: z.array(
            z.object({
                id: z.string(),
                type: z.enum(["FOLLOW", "TIP", "PURCHASE"]),
                follow: z
                    .object({
                        follower: z.object({
                            username: z.string(),
                            profileImage: z.string().nullable(),
                        }),
                    })
                    .nullable(),
                tip: z
                    .object({
                        tipper: z.object({
                            username: z.string(),
                            profileImage: z.string().nullable(),
                        }),
                        amount: z.number(),
                        token: z.string(),
                    })
                    .nullable(),
            }),
        ),
    }),
);

export type UserProfile = Prisma.UserGetPayload<{
    include: {
        creatorToken: { select: { address: true } };
        streams: { where: { status: "SCHEDULED" }; select: { id: true; title: true; scheduledAt: true; roomId: true } };
        holdings: true;
        stats: { select: { followerCount: true; followingCount: true } };
    };
}>;
