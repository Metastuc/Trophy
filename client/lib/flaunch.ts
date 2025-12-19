import { createFlaunch, ReadFlaunchSDK, ReadWriteFlaunchSDK } from "@flaunch/sdk";
import {
    Address,
    encodeAbiParameters,
    encodeFunctionData,
    isAddress,
    maxUint256,
    parseEther,
    parseUnits,
    zeroAddress,
    zeroHash,
} from "viem";

import { CONTRACT_ADDRESSES } from "#~/store/supported-tokens.ts";
import { makeRequest } from "#~/utils/axios.ts";

import { FLAUNCH_ZAP_ABI } from "./abi";
import { API_ENDPOINTS, CLIENT_CONSTANTS } from "./constants";
import { initSmartAccount } from "./smart-account";
import { getWalletClient, publicClient } from "./viem";

let flaunchClient: ReadWriteFlaunchSDK | null = null;
let previousAddress: Address | null = null;

const flaunchReadOnlyClient = createFlaunch({ publicClient }) as ReadFlaunchSDK;

function getFlaunchClient({ address, provider }: GetWalletClient): ReadWriteFlaunchSDK | null {
    // if (!address || !provider) return null;

    if (!flaunchClient && previousAddress?.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        flaunchClient = createFlaunch({
            publicClient,
            walletClient: getWalletClient({ address, provider }),
        }) as ReadWriteFlaunchSDK;
        previousAddress = address;
    }

    return flaunchClient;
}

export async function flaunchCreatorToken({
    creatorAddress,
    ethereumAmountRequiredToFlaunch,
    provider,
    tokenName,
    tokensCreatorWillOwn,
}: FlaunchCreatorToken) {
    try {
        const smartWalletClient = await initSmartAccount(provider);
        const smartAccountAddress = smartWalletClient.account.address;

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
                    account: walletClient.account,
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
            const { logs } = await smartWalletClient.waitForUserOperationReceipt({
                hash: await smartWalletClient.sendUserOperation({
                    callData: await smartWalletClient.account.encodeCalls([
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
            data: { creatorToken, smartAccount: smartWalletClient.account.address, tokenName },
        });

        return { creatorToken };
    } catch (error) {
        throw new Error("Failed to create token: " + ((error as Error).message || "Unknown error"));
    }
}

export async function buyCreatorToken({
    address,
    amount,
    coinAddress,
    provider,
    signTypedData,
    token,
}: TokenSwapParams) {
    let signature: Address | undefined = undefined;
    let permitSingle: PermitSingle | undefined = undefined;
    let poolKey: PoolKey | undefined = undefined;

    const flaunch = getFlaunchClient({ address, provider }) as ReadWriteFlaunchSDK;
    const isUSDC = isAddress(token) && CONTRACT_ADDRESSES.USDC.toLowerCase() === token.toLowerCase();

    if (!amount || Number(amount) <= 0) throw new Error("Invalid swap amount");
    const amountInUnits = parseUnits(amount, isUSDC ? 6 : 18);

    if (token !== "ETH") {
        const tokenAllowance = await flaunch.getERC20AllowanceToPermit2(token);
        if (tokenAllowance < amountInUnits) {
            await flaunch.setERC20AllowanceToPermit2(token, maxUint256);
        }

        const { allowance: tokenPermitAllowance } = await flaunch.getPermit2AllowanceAndNonce(token);

        if (tokenPermitAllowance < amountInUnits) {
            const { typedData, permitSingle: typedPermit } = await flaunch.getPermit2TypedData(token);

            typedData.message.details.amount = typedData.message.details.amount.toString();
            typedData.message.sigDeadline = typedData.message.sigDeadline.toString();

            const { signature: typedSignature } = await signTypedData(typedData, { address });

            signature = typedSignature as Address;
            permitSingle = typedPermit;
        }

        poolKey = {
            currency0: zeroAddress,
            currency1: token,
            fee: 500,
            tickSpacing: 10,
            hooks: zeroAddress,
            hookData: "0x",
        };
    }

    return await verifyTransaction(
        (await flaunch.buyCoin(
            {
                coinAddress,
                slippagePercent: 4,
                swapType: "EXACT_IN",
                amountIn: amountInUnits,
                intermediatePoolKey: poolKey,
                signature,
                permitSingle,
            },
            "V1_2",
        )) as Address,
    );
}

export async function sellCreatorToken({
    address,
    amount,
    coinAddress,
    provider,
    signTypedData,
    token,
}: TokenSwapParams) {
    let poolkey: PoolKey | undefined = undefined;

    const flaunch = getFlaunchClient({ address, provider }) as ReadWriteFlaunchSDK;
    const amountInUnits = parseEther(amount.replace(/,/g, ""));
    const { allowance } = await flaunch.getPermit2AllowanceAndNonce(coinAddress);

    if (token !== "ETH") {
        poolkey = {
            currency0: zeroAddress,
            currency1: token,
            fee: 500,
            tickSpacing: 10,
            hooks: zeroAddress,
            hookData: "0x",
        };
    }

    let hash: Address;

    if (allowance < amountInUnits) {
        const { permitSingle, typedData } = await flaunch.getPermit2TypedData(coinAddress);

        typedData.message.details.amount = typedData.message.details.amount.toString();
        typedData.message.sigDeadline = typedData.message.sigDeadline.toString();

        const { signature } = await signTypedData(typedData, { address });

        hash = await flaunch.sellCoin(
            {
                amountIn: amountInUnits,
                coinAddress,
                intermediatePoolKey: poolkey,
                permitSingle,
                signature: signature as Address,
                slippagePercent: 4,
            },
            "V1_2",
        );
    } else {
        hash = await flaunch.sellCoin(
            {
                amountIn: amountInUnits,
                coinAddress,
                intermediatePoolKey: poolkey,
                slippagePercent: 4,
            },
            "V1_2",
        );
    }

    return verifyTransaction(hash);
}

async function verifyTransaction(hash: Address): Promise<Address> {
    const reciept = await flaunchClient?.drift.waitForTransaction({ hash });
    if (reciept?.status !== "success") throw new Error("Transaction failed");
    return hash;
}

export async function getCreatorTokenPrice(coinAddress: Address) {
    return await flaunchReadOnlyClient.coinPriceInUSD({ coinAddress });
}

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
}

export async function getTokenSwapQuote({
    amount,
    coinAddress,
    isToCreatorToken,
    token,
}: {
    amount: string;
    coinAddress: Address;
    isToCreatorToken: boolean;
    token: TokenIdentifier;
}) {
    let poolkey: PoolKey | undefined = undefined;

    if (token !== "ETH")
        poolkey = {
            currency0: zeroAddress,
            currency1: token,
            fee: 500,
            tickSpacing: 10,
            hooks: zeroAddress,
            hookData: "0x",
        };

    if (isToCreatorToken)
        return await flaunchReadOnlyClient.getBuyQuoteExactInput({
            amountIn: parseEther(amount),
            coinAddress,
            intermediatePoolKey: poolkey,
        });

    return await flaunchReadOnlyClient.getSellQuoteExactInput({
        amountIn: parseEther(amount),
        coinAddress,
        intermediatePoolKey: poolkey,
    });
}
