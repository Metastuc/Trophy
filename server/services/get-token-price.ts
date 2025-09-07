import { NextFunction, Request, Response } from "express";

import { SERVER_CONSTANTS } from "#config/constants.ts";
import { MoralisClient } from "#config/moralis.ts";
import { redis } from "#config/redis.ts";
import { HttpError } from "#middleware/error.ts";

export async function getTokenPrice(request: Request, response: Response, next: NextFunction) {
    const moralis = await MoralisClient();
    const { address } = request.query;

    if (!address) {
        throw new HttpError({ message: "token address is missing", code: 422 });
    }

    const cacheKey = SERVER_CONSTANTS.REDIS_KEYS.TOKEN_PRICE.KEY(address as string);

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            response.customResponse<TokenPriceData>({
                code: 200,
                message: "token price fetched from cache",
                data: JSON.parse(cached),
            });
            return;
        }

        const result = await moralis.EvmApi.token
            .getTokenPrice({
                chain: SERVER_CONSTANTS.CURRENT_MORALIS_CHAIN,
                address: address as string,
            })
            .then((response) => response.toJSON());

        await redis.set(cacheKey, JSON.stringify(result), "EX", SERVER_CONSTANTS.REDIS_KEYS.TOKEN_PRICE.TTL);
        response.customResponse<TokenPriceData>({
            code: 200,
            data: result,
            message: "token price fetched successfully",
        });
    } catch (error) {
        next(error);
    }
}
