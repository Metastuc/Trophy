import { type NextFunction, type Request, type Response } from "express";

import { logger } from "#utils/logger.ts";

export function loggingMiddleware(request: Request, response: Response, next: NextFunction) {
    logger.info(
        {
            body: request.body,
            code: response.statusCode,
            method: request.method,
            url: request.url,
        },
        "incoming request",
    );

    next();
}
