import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';

export const authUser = async (
    req: Request,
    res: Response<TypedResponse<{ isNewUser?: boolean }>>
): Promise<void> => {
    try {
        const { id, authMethod } = req.body;
        console.log(id, authMethod);

        const allowedMethods = ["email", "wallet", "farcaster"];
        if (!allowedMethods.includes(authMethod)) {
          res.status(400).json({
            status: "error",
            message: "Invalid authentication method",
          });
          return;
        }

        const userSnap = await db.collection('users')
        .where(`${authMethod}`, "==", id)
        .limit(1)
        .get();

        if (userSnap.empty) {
            res.status(404).json({
              status: "error",
              message: "User not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            data: { isNewUser: false },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to authenticate user",
        });        
    }
}