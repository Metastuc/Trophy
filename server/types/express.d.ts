import "express-serve-static-core";

import { AuthTokenClaims } from "@privy-io/server-auth";

declare module "express-serve-static-core" {
    interface Response {
        customResponse<T = unknown>(options: {
            data?: T;
            message?: string;
            code: number;
            [key: string]: unknown;
        }): Response;
    }
}

declare global {
    namespace Express {
        interface Request {
            privyUser?: AuthTokenClaims;
        }
    }
}
