import { z } from "zod";

export const CREATED_STREAM_RESPONSE_SCHEMA = z.object({
    roomId: z.string(),
    token: z.string(),
});

export const SCHEDULED_STREAM_RESPONSE_SCHEMA = z.object({
    roomId: z.string(),
});
