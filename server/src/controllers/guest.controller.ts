import type { Request, Response } from "express";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { HUDDLE_API_KEY } from "../utils/env";

export const getGuestAccessToken = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.body;

        if (!roomId) {
            res.status(400).json({
                status: "error",
                message: "Missing roomId",
            });
            return;
        }

        // Generate a guest access token
        const accessToken = new AccessToken({
            apiKey: HUDDLE_API_KEY,
            roomId,
            role: Role.GUEST,
            permissions: {
                admin: false,
                canConsume: true,
                canProduce: true,
                canProduceSources: {
                    cam: true,
                    mic: true,
                    screen: true,
                },
                canSendData: true,
                canRecvData: true,
            },
        });

        const token = await accessToken.toJwt();

        res.status(200).json({
            status: "success",
            token,
        });
    } catch (error) {
        console.error("Error generating guest access token:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
