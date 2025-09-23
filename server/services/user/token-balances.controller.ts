import { NextFunction, Request, Response } from "express";

import { TOKEN_CONFIG } from "@/lib/constants";
import { MoralisClient } from "#config/moralis.ts";
import { prisma } from "#config/prisma.ts";
import { HttpError } from "#middleware/error.ts";

export async function getWalletTokenBalances(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const moralis = await MoralisClient();

    try {
        const isWalletValid = await prisma.user.findUnique({ where: { walletAddress: userId } });
        if (!isWalletValid) throw new HttpError({ message: "user not found", code: 404, data: { userId } });

        const result = await moralis.EvmApi.token
            .getWalletTokenBalances({
                address: userId,
                chain: moralis.EvmUtils.EvmChain.BASE,
            })
            .then((response) => response.toJSON());

        console.log("result", result);

        const tokenBalances = Object.entries(TOKEN_CONFIG).map(function ([_key, value]) {
            const balance = result.find((token) => token.token_address.toLowerCase() === value.address.toLowerCase());

            console.log("balance", balance);

            return {
                symbol: value.symbol,
                name: value.name,
                icon: value.icon,
                balance: balance ? (Number(balance.balance) / 10 ** balance.decimals).toString : "0",
            };
        });

        response.customResponse({
            code: 200,
            data: tokenBalances,
            message: "wallet token balances fetched successfully",
        });
    } catch (error) {
        next(error);
    }
}
