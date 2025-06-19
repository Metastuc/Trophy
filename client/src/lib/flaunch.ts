import { createDrift } from "@delvtech/drift";
import { viemAdapter } from "@delvtech/drift-viem";
import { ReadWriteFlaunchSDK } from "@flaunch/sdk";
import { EIP1193Provider } from "@privy-io/react-auth";
import { parseEther } from "viem";

import { ENV_SCHEMA, network, REVENUE_MANAGER_ADDRESS } from "./constants";
import { getSmartAccount } from "./smartAccount";
import { SignTypedData } from "./types";
import { getPublicClient, getWalletClient } from "./viem";

let fClient: ReadWriteFlaunchSDK | undefined;

const publicClient = getPublicClient();

const flaunchClient = async (provider: EIP1193Provider) => {
    if (!fClient) {
        const walletClient = await getWalletClient(provider);
        const drift = createDrift({
            adapter: viemAdapter({ publicClient, walletClient }),
        });

        fClient = new ReadWriteFlaunchSDK(network.id, drift);
    }

    return fClient;
};

// The sFlaunch means sponsored flaunch (We're sponsoring deployment gas for creator tokens)
const sFlaunchClient = async (provider: EIP1193Provider) => {
    const walletClient = await getSmartAccount(provider);
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
    provider: EIP1193Provider,
    twitter?: string,
    telegram?: string,
): Promise<`0x${string}`> => {
    const sFlaunch = await sFlaunchClient(provider);

    return await sFlaunch.flaunchIPFSWithRevenueManager({
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
        fairLaunchPercent: 40,
        fairLaunchDuration: 30 * 60, // 30 mins
        initialMarketCapUSD: 10_000,
        creatorFeeAllocationPercent: 80,
        revenueManagerInstanceAddress: REVENUE_MANAGER_ADDRESS,
    });
};

const checkTx = async (hash: `0x${string}`, flaunch = fClient) => {
    const txReceipt = await flaunch?.drift.waitForTransaction({ hash });

    if (txReceipt?.status !== "success") {
        throw new Error("Transaction failed");
    }

    return hash;
};

export const buyCreatorToken = async (
    coinAddress: `0x${string}`,
    amount: string,
    provider: EIP1193Provider,
) => {
    const flaunch = await flaunchClient(provider);
    const hash = await flaunch.buyCoin({
        coinAddress,
        slippagePercent: 4,
        swapType: "EXACT_IN",
        amountIn: parseEther(amount),
    });

    return await checkTx(hash);
};

export const sellCreatorToken = async (
    coinAddress: `0x${string}`,
    amount: string,
    provider: EIP1193Provider,
    signTypedData: SignTypedData,
) => {
    const flaunch = await flaunchClient(provider);
    const amountInWei = parseEther(amount);

    const { allowance } = await flaunch.getPermit2AllowanceAndNonce(coinAddress);

    if (allowance < amountInWei) {
        const { typedData, permitSingle } = await flaunch.getPermit2TypedData(coinAddress);
        const { signature } = await signTypedData(typedData);

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

export const deployRevenueManager = async (provider: EIP1193Provider) => {
    const flaunch = await flaunchClient(provider);

    return await flaunch.deployRevenueManager({
        protocolFeePercent: 20,
        protocolRecipient: "0x",
    });
};

export const fetchFeeBalance = async (creator: `0x${string}`, provider: EIP1193Provider) => {
    const flaunch = await flaunchClient(provider);

    return await flaunch.revenueManagerBalance({
        recipient: creator,
        revenueManagerAddress: REVENUE_MANAGER_ADDRESS,
    });
};

export const claimCreatorFees = async (provider: EIP1193Provider) => {
    const flaunch = await flaunchClient(provider);

    return await flaunch.revenueManagerCreatorClaim({
        revenueManagerAddress: REVENUE_MANAGER_ADDRESS,
    });
};

export const claimApplicationFees = async (provider: EIP1193Provider) => {
    const flaunch = await flaunchClient(provider);

    return await flaunch.revenueManagerProtocolClaim({
        revenueManagerAddress: REVENUE_MANAGER_ADDRESS,
    });
};
