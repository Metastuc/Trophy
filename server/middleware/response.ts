import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";

export function customResponse(request: Request, response: Response, next: NextFunction) {
    response.customResponse = function ({ data, message, code, ...rest }) {
        const responseModel: Record<string, unknown> = {
            path: request.url,
            status: code >= 200 && code < 300 ? "success" : "error",
            timeStamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };

        if (data !== undefined) responseModel.data = data;
        if (message) responseModel.message = message;
        if (Object.keys(rest).length) Object.assign(responseModel, rest);

        return response.status(code).json(responseModel);
    };

    next();
}
