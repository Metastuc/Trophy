import { Request, Response } from "express";
import httpStatus from "http-status";

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

export function errorHandler(error: unknown, _: Request, response: Response) {
    console.error(error);

    if (response.customResponse) {
        if (error instanceof HttpError) {
            return response.customResponse({
                code: error.code,
                message: error.message,
                data: error.data,
            });
        }

        return response.customResponse({
            code: 500,
            message: "Internal server error",
            data: { error: (error as Error).message, info: httpStatus[500] },
        });
    }

    response.status(500).json({ message: "Internal server error" });
}
