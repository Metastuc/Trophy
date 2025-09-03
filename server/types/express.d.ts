import "express-serve-static-core";

import { AuthTokenClaims } from "@privy-io/server-auth";

declare module "express-serve-static-core" {
    interface Response {
        customResponse<T = unknown>(options: ApiResponse<T>): Response;
    }
}

declare global {
    namespace Express {
        interface Request {
            privyUser?: AuthTokenClaims;
        }
    }
}
