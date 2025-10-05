import { createFlaunch, ReadFlaunchSDK, ReadWriteFlaunchSDK, RevenueManagerAbi } from "@flaunch/sdk";
import { EIP1193Provider } from "@privy-io/react-auth";
import { Address, encodeAbiParameters, encodeFunctionData, maxUint256, parseEther, parseUnits, zeroAddress, zeroHash } from "viem";

import { CONTRACT_ADDRESSES } from "#~/store/supported-tokens.ts";
import { makeRequest } from "#~/utils/axios.ts";

import { FLAUNCH_ZAP_ABI } from "./abi";
import { API_ENDPOINTS, CLIENT_CONSTANTS } from "./constants";
import { initSmartAccount } from "./smart-account";
import { getWalletClient, publicClient } from "./viem";

let WriteClient: ReadWriteFlaunchSDK | null = null;

const flaunchReadOnlyClient = createFlaunch({ publicClient }) as ReadFlaunchSDK;

export const getFlaunchClient = ({ provider, address }: { provider: EIP1193Provider, address?: Address }) => {
    if (!WriteClient) {
        const walletClient = getWalletClient({ provider, address });

        WriteClient = createFlaunch({ publicClient, walletClient }) as ReadWriteFlaunchSDK;
    }

    return WriteClient;
};

export async function getEthereumRequiredForCreatorTokenAllocation(percentage: string) {
    const premineAmount = parseEther(`${CLIENT_CONSTANTS.CREATOR_TOKEN_SUPPLY * (Number(percentage) / 100)}`);

    return {
        tokensCreatorWillReceieve: premineAmount,
        ethereumAmountRequired: await flaunchReadOnlyClient.ethRequiredToFlaunch({
            initialMarketCapUSD: 5000,
            premineAmount,
            slippagePercent: 1,
        }),
    };
};

export async function flaunchCreatorToken({
    creatorAddress,
    ethereumAmountRequiredToFlaunch,
    provider,
    tokenName,
    tokensCreatorWillOwn,
}: FlaunchCreatorToken) {
    try {
        const smartWallet = await initSmartAccount(provider);
        const smartAccountAddress = smartWallet.account.address;

        const initialMarketCapUSDCWei = parseUnits("5000", 6);
        const initialPriceParams = encodeAbiParameters([{ type: "uint256" }], [initialMarketCapUSDCWei]);

        const creatorFeeAllocationInBasisPoints = 70 * 100;
        const initialTokenFairLaunch = (parseEther(CLIENT_CONSTANTS.CREATOR_TOKEN_SUPPLY.toString()) * 45n) / 100n;

        const { tokenUri } = await makeRequest<CreateTokenUriResponse>({
            method: "POST",
            url: API_ENDPOINTS.TOKEN.CREATE_TOKEN_URI(tokenName),
        }).then((response) => response.data.data);

        const flaunchParams = {
            _flaunchParams: {
                name: tokenName,
                symbol: tokenName.toUpperCase(),
                tokenUri,
                initialTokenFairLaunch,
                fairLaunchDuration: BigInt(30 * 60),
                premineAmount: tokensCreatorWillOwn,
                creator: smartAccountAddress as Address,
                creatorFeeAllocation: creatorFeeAllocationInBasisPoints,
                flaunchAt: 0n,
                initialPriceParams,
                feeCalculatorParams: "0x" as Address,
            },
            _trustedFeeSigner: zeroAddress,
            _premineSwapHookData: "0x",
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
            _treasuryManagerParams: {
                manager: CONTRACT_ADDRESSES.REVENUE_MANAGER,
                permissions: "0x0000000000000000000000000000000000000000" as Address,
                initializeData: "0x" as Address,
                depositData: "0x" as Address,
            },
        };

        let creatorToken: Address | undefined = undefined;
        const contractData = encodeFunctionData({
            abi: FLAUNCH_ZAP_ABI,
            functionName: "flaunch",
            args: [
                flaunchParams._flaunchParams,
                flaunchParams._trustedFeeSigner,
                flaunchParams._premineSwapHookData,
                flaunchParams._whitelistParams,
                flaunchParams._airdropParams,
                flaunchParams._treasuryManagerParams,
            ],
        });

        if (ethereumAmountRequiredToFlaunch !== 0n) {
            const walletClient = getWalletClient({ address: creatorAddress, provider });

            const { logs } = await publicClient.getTransactionReceipt({
                hash: await walletClient.sendTransaction({
                    account: creatorAddress,
                    chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
                    data: contractData,
                    gas: 5000000n,
                    to: CONTRACT_ADDRESSES.FLAUNCH,
                    value: ethereumAmountRequiredToFlaunch,
                }),
            });

            creatorToken = logs[4].address as Address;
            await makeRequest({
                method: "POST",
                url: API_ENDPOINTS.TOKEN.SCHEDULE_TOKEN_CLAIMS(tokenName),
                data: { allocation: tokensCreatorWillOwn },
            });
        } else {
            const { logs } = await smartWallet.waitForUserOperationReceipt({
                hash: await smartWallet.sendUserOperation({
                    callData: await smartWallet.account.encodeCalls([
                        {
                            to: CONTRACT_ADDRESSES.FLAUNCH,
                            data: contractData,
                        },
                    ]),
                }),
            });

            creatorToken = logs[4].address as Address;
        }

        await makeRequest({
            method: "PATCH",
            url: API_ENDPOINTS.TOKEN.SAVE_TOKEN(tokenName),
            data: { creatorToken, smartAccount: smartWallet.account.address, tokenName },
        });

        return { creatorToken };
    } catch (error) {
        throw new Error("Failed to create token: " + ((error as Error).message || "Unknown error"));
    }
}

async function verifyTransaction(hash: Address): Promise<Address> {
    const reciept = await WriteClient?.drift.waitForTransaction({ hash });
    if (reciept?.status !== "success") throw new Error("Transaction failed");
    return hash;
}

export const buyCreatorToken = async ({
    coinAddress,
    amount,
    provider,
    signTypedData,
    address,
    token,
}: TokenSwapParams) => {
    const flaunch = getFlaunchClient({ provider, address });

    const amountInUnits = parseUnits(amount, token === "USDC" ? 6 : 18);

    let signature: Address | undefined = undefined;
    let permitSingle: PermitSingle | undefined = undefined;
    let intermediatePoolKey: IintermediatePoolKey = undefined;

    if (token !== "ETH") {
        const tokenAddress = CONTRACT_ADDRESSES[token];

        const tokenAllowance = await flaunch.getERC20AllowanceToPermit2(tokenAddress);
        if (tokenAllowance < amountInUnits) {
            await flaunch.setERC20AllowanceToPermit2(tokenAddress, maxUint256);
        }

        const { allowance: tokenPermitAllowance } = await flaunch.getPermit2AllowanceAndNonce(tokenAddress);

        if (tokenPermitAllowance < amountInUnits) {
            const { typedData, permitSingle: typedPermit } = await flaunch.getPermit2TypedData(tokenAddress);

            typedData.message.details.amount = typedData.message.details.amount.toString();
            typedData.message.sigDeadline = typedData.message.sigDeadline.toString();

            const { signature: typedSignature } = await signTypedData(typedData, { address });

            signature = typedSignature as Address;
            permitSingle = typedPermit;
        }

        intermediatePoolKey = {
            currency0: zeroAddress,
            currency1: CONTRACT_ADDRESSES[token],
            fee: 500,
            tickSpacing: 10,
            hooks: zeroAddress,
            hookData: "0x",
        };
    }

    const hash = await flaunch.buyCoin(
        {
            coinAddress,
            slippagePercent: 4,
            swapType: "EXACT_IN",
            amountIn: amountInUnits,
            intermediatePoolKey,
            signature,
            permitSingle,
        },
        "V1_1",
    );

    return await verifyTransaction(hash);
};

export const getCreatorTokenPrice = async (coinAddress: Address) => {
    return await flaunchReadOnlyClient.coinPriceInUSD({ coinAddress });
};

export const getCreatorSwapQuote = async ({
    amount,
    coinAddress,
    supportedTokenToCreatorToken,
    token,
}: CreatorSwapQuoteParams) => {
    let intermediatePoolKey: IintermediatePoolKey = undefined;

    if (token.toUpperCase() !== "ETH") {
        intermediatePoolKey = {
            currency0: zeroAddress,
            currency1: CONTRACT_ADDRESSES[token] as Address,
            fee: 500,
            tickSpacing: 10,
            hooks: zeroAddress,
            hookData: "0x",
        };
    }

    if (supportedTokenToCreatorToken) {
        return await flaunchReadOnlyClient.getBuyQuoteExactInput({
            coinAddress,
            intermediatePoolKey,
            amountIn: parseEther(amount),
        });
    }

    return await flaunchReadOnlyClient.getSellQuoteExactInput({ coinAddress, intermediatePoolKey, amountIn: parseEther(amount) });
};

export const sellCreatorToken = async ({
    coinAddress,
    amount,
    provider,
    signTypedData,
    address,
    token,
}: TokenSwapParams) => {
    const flaunch = getFlaunchClient({ provider, address });

    let intermediatePoolKey: IintermediatePoolKey = undefined;
    const amountInUnits = parseEther(amount.replace(/,/g, ""));
    const { allowance } = await flaunch.getPermit2AllowanceAndNonce(coinAddress);

    let hash: Address;

    if (token.toUpperCase() !== "ETH") {
        intermediatePoolKey = {
            currency0: zeroAddress,
            currency1: CONTRACT_ADDRESSES[token] as Address,
            fee: 500,
            tickSpacing: 10,
            hooks: zeroAddress,
            hookData: "0x",
        };
    }

    if (allowance < amountInUnits) {
        const { typedData, permitSingle } = await flaunch.getPermit2TypedData(coinAddress);

        typedData.message.details.amount = typedData.message.details.amount.toString();
        typedData.message.sigDeadline = typedData.message.sigDeadline.toString();

        const { signature } = await signTypedData(typedData, { address });
        hash = await flaunch.sellCoin(
            {
                coinAddress,
                slippagePercent: 4,
                amountIn: amountInUnits,
                permitSingle,
                signature: signature as Address,
                intermediatePoolKey,
            },
            "V1_1",
        );
    } else {
        hash = await flaunch.sellCoin(
            {
                coinAddress,
                amountIn: amountInUnits,
                slippagePercent: 4,
                intermediatePoolKey,
            },
            "V1_1",
        );
    }

    return await verifyTransaction(hash);
};

export const fetchFeeBalance = async (provider: EIP1193Provider) => {
    const flaunch = getFlaunchClient({ provider });
    const smartWallet = await initSmartAccount(provider);

    return await flaunch.revenueManagerBalance({
        recipient: smartWallet.account.address,
        revenueManagerAddress: CONTRACT_ADDRESSES.REVENUE_MANAGER_ADDRESS,
    });
};

type claimType = "claim";

export const claimCreatorFees = async (provider: EIP1193Provider) => {
    try {
        const smartWallet = await initSmartAccount(provider);

        const tx = {
            abi: RevenueManagerAbi,
            functionName: "claim" as claimType,
            to: CONTRACT_ADDRESSES.REVENUE_MANAGER_ADDRESS,
        };

        return await smartWallet.sendTransaction({ calls: [tx] });
    } catch (error: unknown) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

export const claimApplicationFees = async (provider: EIP1193Provider) => {
    const flaunch = getFlaunchClient({ provider });

    return await flaunch.revenueManagerProtocolClaim({
        revenueManagerAddress: CONTRACT_ADDRESSES.REVENUE_MANAGER_ADDRESS,
    });
};
