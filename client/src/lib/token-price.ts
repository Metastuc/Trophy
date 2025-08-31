import { createFlaunch, ReadFlaunchSDK } from "@flaunch/sdk";
import axios from "axios";

import { APPLICATION_CONSTANTS, COINGECKO_URL, ENV_SCHEMA } from "./constants";
import { moralisTokenFetch } from "./moralis";
import { publicClient } from "./viem";

const flaunchReadClient = createFlaunch({ publicClient }) as ReadFlaunchSDK;

export const getPrice = async (tokenToEth: boolean, quantity: number, coinAddress?: string) => {
    try {
        if (tokenToEth) {
            const tokenPrice = await flaunchReadClient.coinPriceInUSD({ coinAddress: coinAddress as `0x${string}` });

            return (Number(tokenPrice) * quantity).toFixed(2);
        }

        const {
            data: { ethereum },
        } = await axios.get(`${COINGECKO_URL}`, {
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": ENV_SCHEMA.COINGECKO_API_KEY,
            },
        });

        const ethPrice = ethereum.usd;

        return (ethPrice * quantity).toFixed(2);
    } catch (error: unknown) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

export const getTokens = async (address: string) => {
    const tokens = await moralisTokenFetch(address);
    const foundTokens: { [key: string]: string } = {};

    for (const token of tokens) {
        if (!APPLICATION_CONSTANTS.SUPPORTED_TOKENS.includes(token.symbol)) continue;
        foundTokens[token.symbol] = token.usdPrice;
    }

    return foundTokens;
};

export const getTipQuote = async ({ quantity, usdPrice }: { quantity: string; usdPrice: string }) => {
    try {
        return Number(quantity) * Number(usdPrice);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
