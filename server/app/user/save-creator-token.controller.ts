import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function saveCreatorToken(request: Request, response: Response, next: NextFunction) {
    const { userId: username } = request.params;
    const { creatorToken, smartAccount, tokenName } = request.body;

    if (!smartAccount) {
        throw new HttpError({ message: "smart account address is missing", code: 422 });
    }

    if (!tokenName) {
        throw new HttpError({ message: "token name is missing", code: 422 });
    }

    if (!creatorToken) {
        throw new HttpError({ message: "creator token address is missing", code: 422 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            throw new HttpError({ message: "user not found", code: 404, data: { username } });
        }

        const creatorTokenExists = await prisma.creatorToken.findUnique({ where: { creatorId: user.id } });
        if (creatorTokenExists) {
            throw new HttpError({ message: "user already has a creator token", code: 403 });
        }

        await prisma.creatorToken.create({
            data: {
                address: creatorToken,
                creatorId: user.id,
                name: tokenName,
                smartAccount,
                symbol: tokenName.toUpperCase(),
            },
        });

        response.customResponse({
            code: 200,
            message: "creator token saved successfully",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
