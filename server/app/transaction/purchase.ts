import { NextFunction, Request, Response } from "express";
import { isAddress, parseEther, parseUnits } from "viem";

import { client } from "#config/viem.ts";
import { HttpError } from "#middleware/error.ts";
import { purchaseQueue } from "#services/worker/purchase.ts";

export async function purchaseTransaction(request: Request, response: Response, next: NextFunction) {
    let amountRaw;

    const privyId = request.privyUser?.userId;
    const { amountIn, amountOut, buyerAddress, creatorUsername, from, to, txHash } = request.body;

    try {
        if (from === "ETH") amountRaw = parseEther(amountIn.toString());
        else if (isAddress(from)) {
            const decimals = await client.readContract({
                address: from,
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

            amountRaw = parseUnits(amountIn.toString(), decimals);
        } else throw new HttpError({ message: "Invalid token address", code: 400, data: { from } });

        await purchaseQueue.add("verify_purchase", {
            amountInToken: amountIn,
            amountOutToken: amountOut,
            amountRaw: amountRaw.toString(),
            buyer: buyerAddress,
            creator: creatorUsername,
            fromSymbol: from,
            isAuthenticated: Boolean(privyId),
            toAddress: to,
            txHash,
        });

        response.customResponse<undefined>({
            code: 202,
            message: "Purchase enqueued for verification",
            data: undefined,
        });
    } catch (error) {
        next(error);
    }
}
