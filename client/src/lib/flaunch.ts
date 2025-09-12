import { createFlaunch, ReadWriteFlaunchSDK, RevenueManagerAbi } from "@flaunch/sdk";
import { EIP1193Provider } from "@privy-io/react-auth";
import { Address, encodeAbiParameters, parseEther, parseUnits, zeroHash } from "viem";

import { FLAUNCH_ZAP_ABI } from "./abi";
import { makeRequest } from "./axios";
import { ENV_SCHEMA } from "./constants";
import { getSmartAccount } from "./smart-account";
import { SignTypedData } from "./types";
import { getWalletClient, publicClient } from "./viem";

let fClient: ReadWriteFlaunchSDK | undefined;

export const flaunchClient = (provider: EIP1193Provider, address?: Address) => {
    if (!fClient) {
        const walletClient = getWalletClient(provider, address);

        fClient = createFlaunch({ publicClient, walletClient }) as ReadWriteFlaunchSDK;
    }

    return fClient;
};

export const createCreatorToken = async (
    name: string,
    provider: EIP1193Provider,
) => {
    try {
        const smartWalletClient = await getSmartAccount(provider);

        const initialMCapInUSDCWei = parseUnits("5000", 6);
        const initialPriceParams = encodeAbiParameters([{ type: "uint256" }], [initialMCapInUSDCWei]);

        const fairLaunchInBps = BigInt(60 * 100);
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
                fairLaunchDuration: BigInt(20 * 60),
                premineAmount: 0n,
                creator: smartWalletClient.account.address as Address,
                creatorFeeAllocation: creatorFeeAllocationInBps,
                flaunchAt: 0n,
                initialPriceParams,
                feeCalculatorParams: "0x" as Address,
            },
            _treasuryManagerParams: {
                manager: ENV_SCHEMA.REVENUE_MANAGER_ADDRESS,
                permissions: "0x0000000000000000000000000000000000000000" as Address,
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

        const tx = {
            abi: FLAUNCH_ZAP_ABI,
            functionName: "flaunch",
            args: [
                flaunchParams._flaunchParams,
                "0x",
                flaunchParams._whitelistParams,
                flaunchParams._airdropParams,
                flaunchParams._treasuryManagerParams,
            ],
            to: ENV_SCHEMA.FLAUNCH_CA,
        };

        const hash = await smartWalletClient.sendTransaction({ calls: [tx] });

        const receipt = await smartWalletClient.waitForTransactionReceipt({ hash });
        const creatorToken = receipt.logs[4].address;

        await makeRequest({
            method: "POST",
            url: `/save-creator-token`,
            data: { creatorToken, sa_address: smartWalletClient.account.address, username: name },
        });
        return { creatorToken, sa_address: smartWalletClient.account.address };
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

// removed the coin version (V1_1) incase e break
export const buyCreatorToken = async (
    coinAddress: Address,
    amount: string,
    provider: EIP1193Provider,
    address: Address,
) => {
    console.log({ coinAddress, amount, address });
    const flaunch = flaunchClient(provider, address);
    const hash = await flaunch.buyCoin(
        {
            coinAddress,
            slippagePercent: 4,
            swapType: "EXACT_IN",
            amountIn: parseEther(amount),
        }
    );

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

export type PermitDetails = {
    token: Address;
    amount: bigint;
    expiration: number;
    nonce: number;
};

export type PermitSingle = {
  details: PermitDetails;
  spender: Address;
  sigDeadline: bigint;
};

export const sellCreatorToken = async (
    coinAddress: Address,
    amount: string,
    provider: EIP1193Provider,
    signTypedData: SignTypedData,
    address: Address,
    signature?: string,
    permitSingle?: PermitSingle
) => {
    const flaunch = flaunchClient(provider, address);
    const amountInUnits = parseEther(amount);
    const { allowance } = await flaunch.getPermit2AllowanceAndNonce(coinAddress);
    console.log({ allowance })
    console.log({ signTypedData })
    console.log(signature, permitSingle)
    // if (allowance < amountInUnits) {
    //     // const { typedData, permitSingle } = await flaunch.getPermit2TypedData(coinAddress);
    //     // const { signature } = await signTypedData(typedData, { address });

    //     const hash = await flaunch.sellCoin({
    //         coinAddress,
    //         slippagePercent: 4,
    //         amountIn: amountInUnits,
    //         permitSingle,
    //         signature: signature as Address,
    //     });

    //     return await checkTx(hash);
    // } else {
        const hash = await flaunch.sellCoin({
            coinAddress,
            amountIn: amountInUnits,
            slippagePercent: 4,
        });

        return await checkTx(hash);
    // }
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
