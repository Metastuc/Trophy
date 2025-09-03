import { z } from "zod";

export const USER_RESPONSE_SCHEMA = z.object({
    isBasicProfileComplete: z.boolean(),
    user: z.object({
        bio: z.string().nullable(),
        email: z.email(),
        profilePicture: z.string().nullable(),
        username: z.string(),
    }),
});

export type UserResponse = z.infer<typeof USER_RESPONSE_SCHEMA>;
