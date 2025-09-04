import { isAddress } from "viem";
import { z } from "zod";

export const AUTHENTICATE_USER_RESPONSE_SCHEMA = z.object({
    isBasicProfileComplete: z.boolean(),
    user: z.object({
        bio: z.string().nullable(),
        creatorToken: z
            .string()
            .refine((value) => isAddress(value), { message: "Invalid address" })
            .nullable(),
        email: z.email(),
        profilePicture: z.string().nullable(),
        username: z.string(),
    }),
});
