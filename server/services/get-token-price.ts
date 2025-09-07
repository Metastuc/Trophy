import { NextFunction, Request, Response } from "express";

import { SERVER_CONSTANTS } from "#config/constants.ts";
import { MoralisClient } from "#config/moralis.ts";

export async function getTokenPrice(request: Request, response: Response, next: NextFunction) {
    const moralis = await MoralisClient();
    const { address } = request.query;

    try {
        response.customResponse<TokenPriceData>({
            code: 200,
            data: await moralis.EvmApi.token
                .getTokenPrice({
                    chain: SERVER_CONSTANTS.CURRENT_MORALIS_CHAIN,
                    address: address as string,
                })
                .then((response) => response.result),
        });
    } catch (error) {
        next(error);
    }
}
