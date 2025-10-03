import { createFlaunch, ReadFlaunchSDK } from "@flaunch/sdk";
import { Address, encodeAbiParameters, encodeFunctionData, parseEther, parseUnits, zeroHash } from "viem";

import { CONTRACT_ADDRESSES } from "#~/store/supported-tokens.ts";
import { makeRequest } from "#~/utils/axios.ts";

import { API_ENDPOINTS, CLIENT_CONSTANTS } from "./constants";
import { initSmartAccount } from "./smart-account";
import { getWalletClient, publicClient } from "./viem";

// let flaunchClient: ReadWriteFlaunchSDK | null = null;
// let previousAddress: Address | null = null;

const flaunchReadOnlyClient = createFlaunch({ publicClient }) as ReadFlaunchSDK;

// function getFlaunchClient({ address, provider }: GetWalletClient): ReadWriteFlaunchSDK | null {
//     if (!address || !provider) return null;

//     if (!flaunchClient && previousAddress?.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
//         flaunchClient = createFlaunch({
//             publicClient,
//             walletClient: getWalletClient({ address, provider }),
//         }) as ReadWriteFlaunchSDK;
//         previousAddress = address;
//     }

//     return flaunchClient;
// }

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
            _treasuryManagerParams: {
                manager: CONTRACT_ADDRESSES.REVENUE_MANAGER,
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

        let creatorToken: Address | undefined = undefined;
        const contractData = encodeFunctionData({
            abi: [
                {
                    type: "function",
                    name: "flaunch",
                    inputs: [
                        {
                            name: "_flaunchParams",
                            type: "tuple",
                            internalType: "struct PositionManager.FlaunchParams",
                            components: [
                                {
                                    name: "name",
                                    type: "string",
                                    internalType: "string",
                                },
                                {
                                    name: "symbol",
                                    type: "string",
                                    internalType: "string",
                                },
                                {
                                    name: "tokenUri",
                                    type: "string",
                                    internalType: "string",
                                },
                                {
                                    name: "initialTokenFairLaunch",
                                    type: "uint256",
                                    internalType: "uint256",
                                },
                                {
                                    name: "fairLaunchDuration",
                                    type: "uint256",
                                    internalType: "uint256",
                                },
                                {
                                    name: "premineAmount",
                                    type: "uint256",
                                    internalType: "uint256",
                                },
                                {
                                    name: "creator",
                                    type: "address",
                                    internalType: "address",
                                },
                                {
                                    name: "creatorFeeAllocation",
                                    type: "uint24",
                                    internalType: "uint24",
                                },
                                {
                                    name: "flaunchAt",
                                    type: "uint256",
                                    internalType: "uint256",
                                },
                                {
                                    name: "initialPriceParams",
                                    type: "bytes",
                                    internalType: "bytes",
                                },
                                {
                                    name: "feeCalculatorParams",
                                    type: "bytes",
                                    internalType: "bytes",
                                },
                            ],
                        },
                    ],
                    outputs: [
                        {
                            name: "memecoin_",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "ethSpent_",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "deployedManager_",
                            type: "address",
                            internalType: "address",
                        },
                    ],
                    stateMutability: "payable",
                },
            ],
            functionName: "flaunch",
            args: [
                flaunchParams._flaunchParams,
                // "0x",
                // "0x",
                // flaunchParams._whitelistParams,
                // flaunchParams._airdropParams,
                // flaunchParams._treasuryManagerParams,
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

// async function verifyTransaction(hash: Address): Promise<Address> {
//     const reciept = await flaunchClient?.drift.waitForTransaction({ hash });
//     if (reciept?.status !== "success") throw new Error("Transaction failed");
//     return hash;
// }

// export async function createCreatorToken({ provider, tokenName }: CreateCreatorToken): Promise<CreatorTokenCreated> {
//     try {
//         const smartWalletClient = await initSmartAccount(provider);
//         const initialMCapInUSDCWei = parseUnits("2000", 6);
//         const initialPriceParams = encodeAbiParameters([{ type: "uint256" }], [initialMCapInUSDCWei]);
//         const fairLaunchInBps = BigInt(40 * 100);
//         const creatorFeeAllocationInBps = 70 * 100;
//         const params = {
//             _flaunchParams: {
//                 name: tokenName,
//                 symbol: tokenName.toUpperCase(),
//                 tokenUri: "ipfs://bafkreiaaojq4u2nopmwilfia7b3rxts2itb7xlgf3qa4z4spqxntfp4gfe",
//                 initialTokenFairLaunch: (100_000_000_000n * fairLaunchInBps) / 10_000n,
//                 fairLaunchDuration: BigInt(30 * 60),
//                 premineAmount: 0n,
//                 creator: smartWalletClient.account.address,
//                 creatorFeeAllocation: creatorFeeAllocationInBps,
//                 flaunchAt: 0n,
//                 initialPriceParams,
//                 feeCalculatorParams: "0x" as Address,
//             },
//             _treasuryManagerParams: {
//                 manager: CONTRACT_ADDRESSES.REVENUE_MANAGER,
//                 initializeData: "0x" as Address,
//                 depositData: "0x" as Address,
//             },
//             _whitelistParams: {
//                 merkleRoot: zeroHash,
//                 merkleIPFSHash: "",
//                 maxTokens: 0n,
//             },
//             _airdropParams: {
//                 airdropIndex: 0n,
//                 airdropAmount: 0n,
//                 airdropEndTime: 0n,
//                 merkleRoot: zeroHash,
//                 merkleIPFSHash: "",
//             },
//         };
//         const { request, result } = await publicClient.simulateContract({
//             address: CONTRACT_ADDRESSES.FLAUNCH,
//             abi: FlaunchZapAbi,
//             functionName: "flaunch",
//             args: [params._flaunchParams],
//             account: smartWalletClient.account,
//         });
//         await smartWalletClient.writeContract(request);
//         await makeRequest({
//             method: "PATCH",
//             url: API_ENDPOINTS.USER.SAVE_TOKEN(tokenName),
//             data: { creatorToken: result[0], smartAccount: smartWalletClient.account.address, tokenName },
//         });
//         return { creatorToken: result[0], smartAccount: smartWalletClient.account.address };
//     } catch (error) {
//         throw new Error("Failed to create token: " + ((error as Error).message || "Unknown error"));
//     }
// }

// export async function buyCreatorToken({
//     amount,
//     buyerAddress,
//     provider,
//     tokenAddress,
// }: BuyCreatorToken): Promise<Address> {
//     const flaunch = getFlaunchClient({ address: buyerAddress, provider });
//     const hash = await flaunch?.buyCoin(
//         {
//             coinAddress: tokenAddress,
//             slippagePercent: 4,
//             swapType: "EXACT_IN",
//             amountIn: parseEther(amount),
//         },
//         "V1_1",
//     );

//     return verifyTransaction(hash as Address);
// }
