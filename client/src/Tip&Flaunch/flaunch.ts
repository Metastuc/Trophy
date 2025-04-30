import { ENV_SCHEMA, network } from "@/lib/constants";
import { getPublicClient, getWalletClient } from "@/viemClient/viemClient";
import { createDrift } from "@delvtech/drift";
import { viemAdapter } from "@delvtech/drift-viem";
import { ReadWriteFlaunchSDK } from "@flaunch/sdk";
import { useSignTypedData } from "@privy-io/react-auth";
import { parseEther } from "viem";

let fClient: ReadWriteFlaunchSDK | undefined;

const publicClient = getPublicClient();
const walletClient = getWalletClient();

const flaunchClient = () => {
  if (!fClient) {
    const drift = createDrift({
      adapter: viemAdapter({ publicClient, walletClient }),
    });

    fClient = new ReadWriteFlaunchSDK(network.id, drift);
    return fClient;
  }

  return fClient;
};

const flaunch = flaunchClient();

export const createCreatorToken = async (
  name: string,
  symbol: string,
  address: `0x${string}`,
  image: string,
  twitter?: string,
  telegram?: string,
): Promise<`0x${string}`> => {
  return await flaunch.fastFlaunchIPFS({
    name,
    symbol,
    creator: address,
    metadata: {
      base64Image: image,
      description: `${name} Creator Token`,
      twitterUrl: twitter,
      telegramUrl: telegram,
    },
    pinataConfig: {
      jwt: ENV_SCHEMA.PINATA_JWT,
    },
  });
};

const checkTx = async (hash: `0x${string}`) => {
  const txReceipt = await flaunch.drift.waitForTransaction({ hash });

  if (txReceipt?.status !== "success") {
    throw new Error("Transaction failed");
  }

  return hash;
};

export const buyCreatorToken = async (coinAddress: `0x${string}`, amount: string) => {
  const hash = await flaunch.buyCoin({
    coinAddress,
    slippagePercent: 4,
    swapType: "EXACT_IN",
    amountIn: parseEther(amount),
  });

  return await checkTx(hash);
};

export const sellCreatorToken = async (coinAddress: `0x${string}`, amount: string) => {
  const { signTypedData } = useSignTypedData();
  const amountInWei = parseEther(amount);

  const { allowance } = await flaunch.getPermit2AllowanceAndNonce(coinAddress);

  if (allowance < amountInWei) {
    const { typedData, permitSingle } = await flaunch.getPermit2TypedData(coinAddress);
    const signature = await signTypedData(typedData);

    const hash = await flaunch.sellCoin({
      coinAddress,
      slippagePercent: 4,
      amountIn: amountInWei,
      permitSingle,
      signature: signature as unknown as `0x${string}`,
    });

    return await checkTx(hash);
  } else {
    const hash = await flaunch.sellCoin({
      coinAddress,
      amountIn: amountInWei,
      slippagePercent: 4,
    });

    return await checkTx(hash);
  }
};
