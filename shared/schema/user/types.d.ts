import { z } from "zod";

import { AUTHENTICATE_USER_RESPONSE_SCHEMA, ONBOARD_USER_RESPONSE_SCHEMA } from ".";

declare global {
    type AuthenticateUserData = z.infer<typeof AUTHENTICATE_USER_RESPONSE_SCHEMA>;
    type AuthenticateUserResponse = ApiResponse<AuthenticateUserData>;

    type OnboardUserData = z.infer<typeof ONBOARD_USER_RESPONSE_SCHEMA>;
    type OnboardUserResponse = ApiResponse<OnboardUserData>;
}

export {};
