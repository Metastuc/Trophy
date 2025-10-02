import { z } from "zod";

import { CREATE_TOKEN_URI_RESPONSE_SCHEMA } from ".";

declare global {
    type CreateTokenUriData = z.infer<typeof CREATE_TOKEN_URI_RESPONSE_SCHEMA>;
    type CreateTokenUriResponse = ApiResponse<CreateTokenUriData>;
}

export {};
