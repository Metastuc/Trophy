import { NextFunction, Request, Response } from "express";

import { privy } from "#config/privy.ts";
import { APP_SETTINGS } from "#config/settings.ts";

import { HttpError } from "./error";

export async function privyAuth(request: Request, response: Response, next: NextFunction) {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader?.startsWith("Bearer ")) {
        response.customResponse({ code: 401, message: "authorization token is missing or invalid" });
        return;
    }

    try {
        request.privyUser = await privy.verifyAuthToken(authorizationHeader.split(" ")[1], APP_SETTINGS.PRIVY_KEY);
        next();
    } catch (error) {
        throw new HttpError({ message: "invalid token", code: 403, data: { error: (error as Error).message } });
    }
}
