import { z } from "zod";

export const CREATE_TOKEN_URI_RESPONSE_SCHEMA = z.object({
    tokenUri: z.string(),
});
