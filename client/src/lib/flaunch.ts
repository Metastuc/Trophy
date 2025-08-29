import { createFlaunch, FlaunchZapAbi, ReadWriteFlaunchSDK, RevenueManagerAbi } from "@flaunch/sdk";
import { EIP1193Provider } from "@privy-io/react-auth";
import { Address, encodeAbiParameters, parseEther, parseUnits, zeroHash } from "viem";

import { makeRequest } from "./axios";
import { ENV_SCHEMA } from "./constants";
import { getSmartAccount } from "./smart-account";
import { SignTypedData } from "./types";
import { getWalletClient, publicClient } from "./viem";

let fClient: ReadWriteFlaunchSDK | undefined;

const flaunchClient = (provider: EIP1193Provider) => {
    if (!fClient) {
        const walletClient = getWalletClient(provider);

        fClient = createFlaunch({ publicClient, walletClient }) as ReadWriteFlaunchSDK;
    }

    return fClient;
};

export const createCreatorToken = async (
    name: string,
    provider: EIP1193Provider,
): Promise<{ creatorToken: Address; sa_address: Address }> => {
    try {
        const smartWalletClient = await getSmartAccount(provider);

        const initialMCapInUSDCWei = parseUnits("2000", 6);
        const initialPriceParams = encodeAbiParameters([{ type: "uint256" }], [initialMCapInUSDCWei]);

        const fairLaunchInBps = BigInt(40 * 100);
        const creatorFeeAllocationInBps = 70 * 100;

        const { tokenUri } = await makeRequest<{ tokenUri: string }>({
            method: "POST",
            url: `/create-token-uri`,
            data: { username: name },
        }).then((response) => response.data);

        const flaunchParams = {
            _flaunchParams: {
                name,
                symbol: name.toUpperCase(),
                tokenUri,
                initialTokenFairLaunch: (100_000_000_000n * fairLaunchInBps) / 10_000n,
                fairLaunchDuration: BigInt(30 * 60),
                premineAmount: 0n,
                creator: smartWalletClient.account.address as Address,
                creatorFeeAllocation: creatorFeeAllocationInBps,
                flaunchAt: 0n,
                initialPriceParams,
                feeCalculatorParams: "0x" as Address,
            },
            _treasuryManagerParams: {
                manager: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
                initializeData: "0x" as Address,
                depositData: "0x" as Address,
            },
            _whitelistParams: {
                merkleRoot: zeroHash,
                merkleIPFSHash: "",
                maxTokens: 0n,
            },
            _airdropParams: {
                airdropIndex: 0n,
                airdropAmount: 0n,
                airdropEndTime: 0n,
                merkleRoot: zeroHash,
                merkleIPFSHash: "",
            },
        };

        const { request, result } = await publicClient.simulateContract({
            address: ENV_SCHEMA.FLAUNCH_CA,
            abi: FlaunchZapAbi,
            functionName: "flaunch",
            args: [
                flaunchParams._flaunchParams,
                // flaunchParams._whitelistParams,
                // flaunchParams._airdropParams,
                // flaunchParams._treasuryManagerParams,
            ],
            account: smartWalletClient.account,
        });

        await smartWalletClient.writeContract(request);
        await makeRequest({
            method: "POST",
            url: `/save-creator-token`,
            data: { creatorToken: result[0], sa_address: smartWalletClient.account.address, username: name },
        });
        return { creatorToken: result[0], sa_address: smartWalletClient.account.address };
    } catch (error: unknown) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

const checkTx = async (hash: Address, flaunch = fClient) => {
    const txReceipt = await flaunch?.drift.waitForTransaction({ hash });

    if (txReceipt?.status !== "success") {
        throw new Error("Transaction failed");
    }

    return hash;
};

export const buyCreatorToken = async (coinAddress: Address, amount: string, provider: EIP1193Provider) => {
    const flaunch = flaunchClient(provider);
    const hash = await flaunch.buyCoin({
        coinAddress,
        slippagePercent: 4,
        swapType: "EXACT_IN",
        amountIn: parseEther(amount),
    });

    return await checkTx(hash);
};

export const getSwapQuote = async (
    provider: EIP1193Provider,
    ethToCreatorToken: boolean,
    amount: string,
    coinAddress: Address,
) => {
    const flaunch = flaunchClient(provider);
    if (ethToCreatorToken) {
        return await flaunch.getBuyQuoteExactInput(coinAddress, parseEther(amount));
    }

    return await flaunch.getSellQuoteExactInput(coinAddress, parseEther(amount));
};

export const sellCreatorToken = async (
    coinAddress: Address,
    amount: string,
    provider: EIP1193Provider,
    signTypedData: SignTypedData,
) => {
    const flaunch = flaunchClient(provider);
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
            signature: signature as unknown as Address,
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

export const fetchFeeBalance = async (provider: EIP1193Provider) => {
    const flaunch = flaunchClient(provider);
    const smartWalletClient = await getSmartAccount(provider);

    return await flaunch.revenueManagerBalance({
        recipient: smartWalletClient.account.address,
        revenueManagerAddress: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
    });
};

export const claimCreatorFees = async (provider: EIP1193Provider) => {
    try {
        const smartWalletClient = await getSmartAccount(provider);

        const { request } = await publicClient.simulateContract({
            address: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
            abi: RevenueManagerAbi,
            functionName: "claim",
            args: [],
            account: smartWalletClient.account,
        });

        return await smartWalletClient.writeContract(request);
    } catch (error: unknown) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

export const claimApplicationFees = async (provider: EIP1193Provider) => {
    const flaunch = flaunchClient(provider);

    return await flaunch.revenueManagerProtocolClaim({
        revenueManagerAddress: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
    });
};
