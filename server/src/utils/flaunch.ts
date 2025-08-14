import { createFlaunch, ReadFlaunchSDK } from "@flaunch/sdk";
import { http, createPublicClient, type PublicClient, type Address } from "viem";
import { NETWORK } from "./env";

export const getTokenDetails = async (coinAddress: Address, profile = false) => {
  let tokenImage: string | undefined = undefined;
  let tokenSymbol: string | undefined = undefined;

  const publicClient = createPublicClient({
    chain: NETWORK,
    transport: http()
  }) as PublicClient;

  const flaunchClient = createFlaunch({ publicClient }) as ReadFlaunchSDK;

  const mcap = await flaunchClient.coinMarketCapInUSD({ coinAddress });

  const price = await flaunchClient.coinPriceInUSD({ coinAddress });

  if (profile) {
    const { symbol, image } = await flaunchClient.getCoinMetadata(coinAddress);
    tokenImage = image;
    tokenSymbol = symbol;
  }


  return { mcap, price, tokenSymbol, tokenImage };
}

