import { z } from "zod";

import { AUTHENTICATE_USER_RESPONSE_SCHEMA } from ".";

declare global {
    type AuthenticateUserResponse = z.infer<typeof AUTHENTICATE_USER_RESPONSE_SCHEMA>;
}

export {};
