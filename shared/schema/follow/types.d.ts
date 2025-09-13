import { z } from "zod";

import { FOLLOW_STATUS_RESPONSE_SCHEMA } from ".";

declare global {
    type FollowStatusData = z.infer<typeof FOLLOW_STATUS_RESPONSE_SCHEMA>;
    type FollowStatusResponse = ApiResponse<FollowStatusData>;
}

export {};
