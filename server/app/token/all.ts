import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";

export async function getAllCreatorTokens(_request: Request, response: Response, next: NextFunction) {
    try {
        response.customResponse({
            code: 200,
            message: "all creator tokens fetched successfully",
            data: await prisma.creatorToken.findMany({
                select: {
                    address: true,
                    image: true,
                    name: true,
                    symbol: true,
                },
            }),
        });
    } catch (error) {
        next(error);
    }
}
