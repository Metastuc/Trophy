import { type NextFunction, type Request, type Response } from "express";

import { logger } from "#utils/logger.ts";

export function loggingMiddleware(request: Request, response: Response, next: NextFunction) {
    const start = Date.now();

    response.on("finish", function () {
        logger.info(
            {
                body: request.body,
                code: response.statusCode,
                method: request.method,
                url: request.originalUrl,
                duration: `${Date.now() - start}ms`,
            },
            "HTTP request",
        );
    });

    next();
}
