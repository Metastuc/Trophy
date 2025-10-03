import { z } from "zod";

import { FEED_RESPONSE_SCHEMA } from ".";

declare global {
    type PublicFeedData = z.infer<typeof FEED_RESPONSE_SCHEMA>;
    type PublicFeedResponse = ApiResponse<PublicFeedData>;
}

export {};
