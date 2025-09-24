import { NextFunction, Request, Response } from "express";

import { WALLET_TOKEN_BALANCES_RESPONSE_SCHEMA } from "#~/schema/user/index.ts";
import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";
import { SERVER_CONSTANTS } from "#config/constants.ts";
import { MoralisClient } from "#config/moralis.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { HttpError } from "#middleware/error.ts";

import { formatBalance } from "./utils";

export async function getWalletTokenBalances(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const moralis = await MoralisClient();
    const cacheKey = SERVER_CONSTANTS.REDIS_KEYS.WALLET_BALANCES.KEY(userId);

    try {
        const isWalletValid = await prisma.user.findUnique({ where: { walletAddress: userId } });
        if (!isWalletValid) throw new HttpError({ message: "user not found", code: 404, data: { userId } });

        const cached = await redis.get(cacheKey);
        if (cached) {
            response.customResponse<UserWalletTokenBalancesData>({
                code: 200,
                data: WALLET_TOKEN_BALANCES_RESPONSE_SCHEMA.parse(JSON.parse(cached)),
                message: "wallet token balances fetched successfully from cache",
            });
            return;
        }

        const result = await moralis.EvmApi.token
            .getWalletTokenBalances({
                address: userId,
                chain: moralis.EvmUtils.EvmChain.BASE,
            })
            .then((response) => response.toJSON());

        const tokenBalances = Object.entries(TOKEN_CONFIG).map(function ([_key, value]) {
            const supportedToken = result.find(
                (token) => token.token_address.toLowerCase() === value.address.toLowerCase(),
            );

            return {
                address: value.address,
                balance: supportedToken
                    ? formatBalance({ balance: supportedToken.balance, decimals: supportedToken.decimals })
                    : "0",
                icon: value.icon,
                name: value.name,
                symbol: value.symbol,
            };
        });

        const parsed = WALLET_TOKEN_BALANCES_RESPONSE_SCHEMA.parse(tokenBalances);
        await redis.setex(cacheKey, SERVER_CONSTANTS.REDIS_KEYS.WALLET_BALANCES.TTL, JSON.stringify(parsed));

        response.customResponse<UserWalletTokenBalancesData>({
            code: 200,
            data: parsed,
            message: "wallet token balances fetched successfully",
        });
    } catch (error) {
        next(error);
    }
}
