import { addMonths } from "date-fns";
import { NextFunction, Request, Response } from "express";

import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function createTokenWithdrawalSchedule(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const { allocation } = request.body;

    try {
        const user = await prisma.user.findUnique({ where: { username: userId } });
        if (!user) throw new HttpError({ message: "User not found", code: 404, data: { userId } });

        await prisma.claimsSchedule.create({
            data: {
                userId: user.id,
                lockedToken: Number(allocation),
                tokenLeft: Number(allocation),
                claimDate: addMonths(new Date(), 1),
                lastClaimed: new Date(),
                totalClaimed: 0,
            },
        });

        response.customResponse<undefined>({
            code: 200,
            message: "Token claims schedule created successfully",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
