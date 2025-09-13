import { isAddress } from "viem";
import { z } from "zod";

export const CREATED_STREAM_RESPONSE_SCHEMA = z.object({
    roomId: z.string(),
    token: z.string(),
});

export const SCHEDULED_STREAM_RESPONSE_SCHEMA = z.object({
    roomId: z.string(),
});

export const JOIN_STREAM_RESPONSE_SCHEMA = z.object({
    creatorProfileImage: z.url(),
    creatorToken: z.string().optional().nullable(),
    creatorUsername: z.string(),
    creatorWalletAddress: z.string().refine((value) => isAddress(value)),
    role: z.enum(["host", "guest", "listener"]),
    title: z.string(),
    token: z.string(),
});
