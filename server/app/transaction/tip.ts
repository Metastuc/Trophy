import { NextFunction, Request, Response } from "express";
import { parseEther, parseUnits } from "viem";

import { client } from "#config/viem.ts";
import { tipsQueue } from "#services/worker/tip.ts";

export async function tipTransaction(request: Request, response: Response, next: NextFunction) {
    let amountRaw;

    const privyId = request.privyUser?.userId;
    const { txHash, sender, recipient, token, tokenAddress, amountInToken, amountInUsd, chainId } = request.body;

    try {
        if (token === "ETH") {
            amountRaw = parseEther(amountInToken.toString());
        } else {
            const decimals = await client.readContract({
                address: tokenAddress,
                abi: [
                    {
                        name: "decimals",
                        type: "function",
                        stateMutability: "view",
                        inputs: [],
                        outputs: [{ type: "uint8" }],
                    },
                ],
                functionName: "decimals",
            });

            amountRaw = parseUnits(amountInToken.toString(), decimals);
        }

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
