import { createFlaunch, FlaunchZapAbi, ReadWriteFlaunchSDK } from "@flaunch/sdk";
import { Address, encodeAbiParameters, parseEther, parseUnits, zeroHash } from "viem";

import { ENV_SCHEMA } from "./constants";
import { initSmartAccount } from "./smart-account";
import { getWalletClient, publicClient } from "./viem";

let flaunchClient = null as ReadWriteFlaunchSDK | null;
let previousAddress = null as Address | null;

function getFlaunchClient({ address, provider }: GetWalletClient): ReadWriteFlaunchSDK | null {
    if (!address || !provider) return null;

    if (!flaunchClient && previousAddress?.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        flaunchClient = createFlaunch({
            publicClient,
            walletClient: getWalletClient({ address, provider }),
        }) as ReadWriteFlaunchSDK;
        previousAddress = address;
    }

    return flaunchClient;
}

async function verifyTransaction(hash: Address): Promise<Address> {
    const reciept = await flaunchClient?.drift.waitForTransaction({ hash });
    if (reciept?.status !== "success") throw new Error("Transaction failed");
    return hash;
}

export async function createCreatorToken({ provider, tokenName }: CreateCreatorToken): Promise<CreatorTokenCreated> {
    try {
        const smartWalletClient = await initSmartAccount(provider);

        const initialMCapInUSDCWei = parseUnits("2000", 6);
        const initialPriceParams = encodeAbiParameters([{ type: "uint256" }], [initialMCapInUSDCWei]);

        const fairLaunchInBps = BigInt(40 * 100);
        const creatorFeeAllocationInBps = 70 * 100;

        const params = {
            _flaunchParams: {
                name: tokenName,
                symbol: tokenName.toUpperCase(),
                tokenUri: "ipfs://bafkreiaaojq4u2nopmwilfia7b3rxts2itb7xlgf3qa4z4spqxntfp4gfe",
                initialTokenFairLaunch: (100_000_000_000n * fairLaunchInBps) / 10_000n,
                fairLaunchDuration: BigInt(30 * 60),
                premineAmount: 0n,
                creator: smartWalletClient.account.address,
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
            address: "0x312706b6599bb406cb21a91c3314ec7883b014a1",
            abi: FlaunchZapAbi,
            functionName: "flaunch",
            args: [params._flaunchParams],
            account: smartWalletClient.account,
        });

        await smartWalletClient.writeContract(request);
        return { creatorToken: result[0], smartAccount: smartWalletClient.account.address };
    } catch (error) {
        throw new Error("Failed to create token: " + ((error as Error).message || "Unknown error"));
    }
}

export async function buyCreatorToken({ amount, buyerAddress, provider, tokenAddress }: BuyCreatorToken) {
    const flaunch = getFlaunchClient({ address: buyerAddress, provider });
    const hash = await flaunch?.buyCoin(
        {
            coinAddress: tokenAddress,
            slippagePercent: 4,
            swapType: "EXACT_IN",
            amountIn: parseEther(amount),
        },
        "V1_1",
    );

    return verifyTransaction(hash as Address);
}
