import { z } from "zod";

import { AUTHENTICATE_USER_RESPONSE_SCHEMA } from ".";

declare global {
    type AuthenticateUserData = z.infer<typeof AUTHENTICATE_USER_RESPONSE_SCHEMA>;
    type AuthenticateUserResponse = ApiResponse<AuthenticateUserData>;
}

export {};
