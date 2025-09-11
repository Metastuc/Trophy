import { z } from "zod";

export const CREATED_STREAM_RESPONSE_SCHEMA = z.object({
    roomId: z.string(),
    token: z.string(),
});

export const SCHEDULED_STREAM_RESPONSE_SCHEMA = z.object({
    roomId: z.string(),
});

export const JOIN_STREAM_RESPONSE_SCHEMA = z.object({
    participants: z.array(
        z.object({
            id: z.string(),
            role: z.string(),
        }),
    ),
    profileImage: z.url(),
    role: z.enum(["host", "guest", "listener"]),
    title: z.string(),
    token: z.string(),
    username: z.string(),
});
