import { createFlaunch, ReadFlaunchSDK } from "@flaunch/sdk";
import axios from "axios";
import { Address, parseAbi } from "viem";

import { APPLICATION_CONSTANTS, BASE_TOKEN_INFO, COINGECKO_URL, ENV_SCHEMA } from "./constants";
import { moralisTokenFetch } from "./moralis";
import { toLocaleString } from "./utils";
import { publicClient } from "./viem";

type FoundTokens = Record<string, typeof BASE_TOKEN_INFO>;

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

    const foundTokens: FoundTokens = APPLICATION_CONSTANTS.SUPPORTED_TOKENS.reduce((acc, token) => {
        acc[token] = { ...BASE_TOKEN_INFO };
        return acc;
    }, {} as FoundTokens);

    for (const token of tokens) {
        console.log(token);

        if (!APPLICATION_CONSTANTS.SUPPORTED_TOKENS.includes(token.symbol)) continue;

        foundTokens[token.symbol as keyof typeof foundTokens] = {
            tokenPrice: Number(token.usdPrice).toFixed(2),
            balance: Number(token.balanceFormatted).toFixed(2),
            tokenPriceInUsd: Number(token.usdValue).toFixed(2),
        };
    }

    return foundTokens;
};

export const getQuote = ({ quantity, usdPrice }: { quantity: string; usdPrice: string }) => {
    try {
        return parseFloat(quantity) * parseFloat(usdPrice);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getViewerBalance = async (tokenAddress: Address, userAddress: Address) => {
    const tokenBalance = await publicClient.readContract({
        abi: parseAbi(["function balanceOf(address owner) view returns (uint256)"]),
        args: [userAddress],
        functionName: "balanceOf",
        address: tokenAddress,
    });

    const ethBalance = await publicClient.getBalance({ address: userAddress });

    return { tokenBal: toLocaleString(tokenBalance) ?? 0, ethBal: toLocaleString(ethBalance, false) ?? 0 };
};
