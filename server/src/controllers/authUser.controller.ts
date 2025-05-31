import { type Request, type Response } from "express";
import { type TypedResponse } from "../type/response";
import { db } from '../utils/firebase.js';

interface MissingFields {
    email?: boolean;
    uploadedPfp?: boolean;
    bio?: boolean;
    exists: boolean;
}

export const authUser = async (
    req: Request,
    res: Response<TypedResponse<{ isNewUser?: boolean; missingFields?: MissingFields }>>
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
            res.status(200).json({
                status: "success",
                data: { 
                    isNewUser: true,
                    missingFields: {
                        exists: false,
                        email: true,
                        uploadedPfp: true,
                        bio: true
                    }
                },
            });
            return;
        }

        const userData = userSnap.docs[0].data();
        const missingFields: MissingFields = {
            exists: true,
            email: !userData.email,
            uploadedPfp: !userData.uploadedPfp || userData.uploadedPfp === "url",
            bio: !userData.bio
        };

        res.status(200).json({
            status: "success",
            data: { 
                isNewUser: false,
                missingFields
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to authenticate user",
        });        
    }
};