import axios from "axios";
import { NextFunction, Request, Response } from "express";

import { COINGECKO_URL, SERVER_CONSTANTS, SERVER_ENV } from "#config/constants.ts";
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
                chain: moralis.EvmUtils.EvmChain.BASE,
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

export const getEthPrice = async (request: Request, response: Response, next: NextFunction) => {
    const { walletAddress } = request.query;

    if (!walletAddress) {
        throw new HttpError({ message: "wallet address is missing", code: 422 });
    }

    const cacheKey = SERVER_CONSTANTS.REDIS_KEYS.ETH_TOKEN_PRICE.KEY(walletAddress as string);

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            response.customResponse<ETHPriceData>({
                code: 200,
                message: "eth price fetched from cache",
                data: JSON.parse(cached),
            });
            return;
        }

        const req_options = {
            url: COINGECKO_URL,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-cg-demo-api-key": SERVER_ENV.COINGECKO_API_KEY
            }
        }

        const result = await axios.request(req_options)
            .then((response) => response.data);

        await redis.set(cacheKey, JSON.stringify(result), "EX", SERVER_CONSTANTS.REDIS_KEYS.ETH_TOKEN_PRICE.TTL);
        response.customResponse<ETHPriceData>({
            code: 200,
            data: result,
            message: "eth price fetched successfully",
        });
    } catch (error) {
        next(error);
    }
}