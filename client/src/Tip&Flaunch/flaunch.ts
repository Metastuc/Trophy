import { ENV_SCHEMA, network } from "@/lib/constants";
import { getPublicClient, getWalletClient } from "@/viemClient/viemClient";
import { createDrift } from "@delvtech/drift";
import { viemAdapter } from "@delvtech/drift-viem";
import { ReadWriteFlaunchSDK } from "@flaunch/sdk";
import { ConnectedWallet, useSignTypedData } from "@privy-io/react-auth";
import { parseEther } from "viem";
import { getSmartAccount } from "@/biconomy/smartAccount"


let fClient: ReadWriteFlaunchSDK | undefined;

const publicClient = getPublicClient();

const flaunchClient = async (wallet: ConnectedWallet) => {
  if (!fClient) {
    const walletClient = await getWalletClient(wallet);
    const drift = createDrift({
      adapter: viemAdapter({ publicClient, walletClient }),
    });

    fClient = new ReadWriteFlaunchSDK(network.id, drift);
  }

  return fClient;
};

// The sFlaunch means sponsored flaunch (We're sponsoring deployment gas for creator tokens)
const sFlaunchClient = async (wallet: ConnectedWallet) => {
  const walletClient = await getSmartAccount(wallet);
  const drift = createDrift({
    adapter: viemAdapter({ publicClient, walletClient }),
  });

  const sClient = new ReadWriteFlaunchSDK(network.id, drift);

  return sClient;
};

export const createCreatorToken = async (
  name: string,
  symbol: string,
  address: `0x${string}`,
  image: string,
  wallet: ConnectedWallet,
  twitter?: string,
  telegram?: string,
): Promise<`0x${string}`> => {

  const sFlaunch = await sFlaunchClient(wallet);

  return await sFlaunch.fastFlaunchIPFS({
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

const checkTx = async (hash: `0x${string}`, flaunch = fClient) => {
  const txReceipt = await flaunch?.drift.waitForTransaction({ hash });

  if (txReceipt?.status !== "success") {
    throw new Error("Transaction failed");
  }

  return hash;
};

export const buyCreatorToken = async (coinAddress: `0x${string}`, amount: string) => {
  const flaunch = await flaunchClient();
  const hash = await flaunch.buyCoin({
    coinAddress,
    slippagePercent: 4,
    swapType: "EXACT_IN",
    amountIn: parseEther(amount),
  });

  return await checkTx(hash);
};

export const sellCreatorToken = async (coinAddress: `0x${string}`, amount: string) => {
  const flaunch = await flaunchClient();
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