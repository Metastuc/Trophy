import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { logger } from "#utils/logger.ts";

interface HttpErrorProps {
    message: string;
    code?: number;
    data?: unknown;
}

export class HttpError extends Error {
    code: number;
    data?: unknown;
    status?: string;

    constructor({ message, code = 500, data }: HttpErrorProps) {
        super(message);
        this.code = code;
        this.data = data;
        this.name = "HttpError";
        this.status = httpStatus[code as keyof typeof httpStatus] as unknown as string;
    }
}

export function errorHandler(error: unknown, request: Request, response: Response, _next: NextFunction) {
    console.error(error);

    if (response.customResponse) {
        if (error instanceof HttpError) {
            response.customResponse({
                code: error.code,
                message: error.message,
                data: error.data,
            });
            return;
        }

        response.customResponse({
            code: 500,
            message: "Internal server error",
            data: { error: (error as Error).message, info: httpStatus[500] },
        });
        return;
    }

    logger.error(
        {
            method: request.method,
            url: request.originalUrl,
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
        },
        "API Error",
    );
    response.status(500).json({ message: "Internal server error" });
}
