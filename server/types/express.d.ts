import "express-serve-static-core";

declare module "express-serve-static-core" {
    interface Response {
        customResponse: (options: {
            data?: unknown;
            message?: string;
            code: number;
            [key: string]: unknown;
        }) => Response;
    }
}
