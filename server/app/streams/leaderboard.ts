import { NextFunction, Request, Response } from "express";

export async function userLeaderboard(_request: Request, response: Response, next: NextFunction) {
    try {
        response.customResponse({
            code: 200,
            message: "User leaderboard fetched successfully",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
