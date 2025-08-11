import { createFlaunch, ReadFlaunchSDK } from "@flaunch/sdk";
import { http, createPublicClient, type PublicClient, type Address } from "viem";
import { NETWORK } from "./env";

export const getMcapAndPrice = async (coinAddress: Address) => {
  const publicClient = createPublicClient({
    chain: NETWORK,
    transport: http()
  }) as PublicClient;

  const flaunchClient = createFlaunch({ publicClient }) as ReadFlaunchSDK;

  const mcap = await flaunchClient.coinMarketCapInUSD({ coinAddress });

  const price = await flaunchClient.coinPriceInUSD({ coinAddress });

  return { mcap, price };
}

