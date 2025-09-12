import { z } from "zod";

export const FOLLOW_STATUS_RESPONSE_SCHEMA = z.object({
    isFollowing: z.boolean(),
});
