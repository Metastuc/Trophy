/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable simple-import-sort/imports */
import { createFlaunch, ReadFlaunchSDK } from "@flaunch/sdk";
import { publicClient } from "./viem";
import axios from "axios";
import { COINGECKO_URL, ENV_SCHEMA } from "./constants";

const flaunchReadClient = createFlaunch({ publicClient }) as ReadFlaunchSDK;

export const getPrice = async (tokenToEth: boolean, quantity: number, coinAddress?: string) => {
  try {
    if (tokenToEth) {
      const tokenPrice = await flaunchReadClient.coinPriceInUSD({ coinAddress: coinAddress as `0x${string}` });

      return (Number(tokenPrice) * quantity).toFixed(2);
    }

    const { data: { ethereum } } = await axios.get(`${COINGECKO_URL}`, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": ENV_SCHEMA.COINGECKO_API_KEY,
      },
    });

    const ethPrice = ethereum.usd;

    return (ethPrice * quantity).toFixed(2);
  } catch (error: any) {
    console.error(error);
    throw new Error(error)
  }
}
