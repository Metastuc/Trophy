import { z } from "zod";

export const AUTHENTICATE_USER_RESPONSE_SCHEMA = z.object({
    isBasicProfileComplete: z.boolean(),
    user: z.object({
        bio: z.string().nullable(),
        email: z.email(),
        profilePicture: z.string().nullable(),
        username: z.string(),
    }),
});

declare global {
    type AuthenticateUserResponse = z.infer<typeof AUTHENTICATE_USER_RESPONSE_SCHEMA>;
}

export {};
