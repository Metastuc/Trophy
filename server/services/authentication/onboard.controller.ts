import { NextFunction, Request, Response } from "express";

export async function onBoard(request: Request, response: Response, next: NextFunction) {
    try {
    } catch (error) {
        next(error);
    }
}
