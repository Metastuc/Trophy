import { isAddress } from "viem";
import { z } from "zod";

import { Prisma } from "#generated/prisma/index.js";

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

export const PROFILE_RESPONSE_SCHEMA = z.object({});

export type UserProfile = Prisma.UserGetPayload<{
    include: {
        creatorToken: { select: { address: true } };
        streams: { where: { status: "SCHEDULED" }; select: { id: true; title: true; scheduledAt: true; roomId: true } };
        holdings: true;
    };
}>;
