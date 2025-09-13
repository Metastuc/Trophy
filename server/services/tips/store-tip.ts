import { NextFunction, Request, Response } from "express";
import { parseEther, parseUnits } from "viem";

import { tipsQueue } from "./store-tip.worker";

export async function storeTip(request: Request, response: Response, next: NextFunction) {
    const privyId = request.privyUser?.userId;
    const { txHash, sender, recipient, token, tokenAddress, amountInToken, amountInUsd, chainId } = request.body;
    const amountRaw = token === "ETH" ? parseEther(amountInToken.toString()) : parseUnits(amountInToken.toString(), 18);

    try {
        await tipsQueue.add("verify_tip", {
            amountInToken,
            amountRaw: amountRaw.toString(),
            amountUsd: parseFloat(amountInUsd),
            chainId,
            isAuthenticated: Boolean(privyId),
            recipient,
            sender,
            token,
            tokenAddress,
            txHash,
        });

        response.customResponse<undefined>({
            code: 202,
            message: "Tip enqueued for verification",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
