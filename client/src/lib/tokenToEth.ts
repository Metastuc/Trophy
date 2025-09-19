import {
    createMeeClient,
    getMEEVersion,
    greaterThanOrEqualTo,
    MEEVersion,
    type MultichainSmartAccount,
    runtimeERC20BalanceOf,
    toMultichainNexusAccount,
    UniswapSwapRouterAbi as ROUTER_ABI,
} from "@biconomy/abstractjs";
import type { EIP1193Provider } from "@privy-io/react-auth";
import { type Address, custom, parseUnits } from "viem";

import { MORPH_ABI, QUOTE_ABI } from "./abi";
import { network } from "./constants";
import { BASE_V2_QUOTER, BASE_V3_ROUTER, BASE_WETH, MORPHO_RE7_POOL, TOKEN_ADDRESSES } from "./contracts";
import { publicClient } from "./viem";

type tokenType = "USDC" | "ZORA" | "DEGEN" | "BNKR" | "FLAY";

const chainId = network.id as unknown as number;

export const performTokentoETHSwap = async (
    token: tokenType,
    walletType: string,
    address: Address,
    signer: EIP1193Provider,
    amount: string,
    minOutAmount: bigint,
) => {
    try {
        const nexusAccount = await toMultichainNexusAccount({
            chainConfigurations: [
                {
                    chain: network,
                    transport: custom(signer),
                    version: getMEEVersion(MEEVersion.V2_1_0),
                },
            ],
            signer,
            accountAddress: address,
        });

        const MeeClient = await createMeeClient({ account: nexusAccount });
        const tokenAddress = TOKEN_ADDRESSES[token] as Address;

        const decimals = token === "USDC" ? 6 : 18;
        const tokenInUnits = parseUnits(amount, decimals);

        if (walletType !== "privy") {
            const approveTokenIx = await nexusAccount.buildComposable({
                type: "approve",
                data: {
                    spender: BASE_V3_ROUTER,
                    tokenAddress,
                    chainId,
                    amount: tokenInUnits,
                },
            });

            const { performSwapIx, approveMorphoIx, supplyWETHtoMORPHOIx } = await getIxs(
                tokenAddress,
                nexusAccount,
                minOutAmount,
            );

            const txTrigger = {
                chainId,
                tokenAddress,
                amount: tokenInUnits,
            };

            const quote = await MeeClient.getFusionQuote({
                trigger: txTrigger,
                feeToken: {
                    address: tokenAddress,
                    chainId,
                },
                instructions: [approveTokenIx, performSwapIx, approveMorphoIx, supplyWETHtoMORPHOIx],
            });

            const { hash: fusionHash } = await MeeClient.executeFusionQuote({ fusionQuote: quote });

            const { hash } = await MeeClient.waitForSupertransactionReceipt({ hash: fusionHash });

            return hash;
        }

        const { performSwapIx, approveMorphoIx, supplyWETHtoMORPHOIx } = await getIxs(
            tokenAddress,
            nexusAccount,
            minOutAmount,
        );

        const { hash: executeHash } = await MeeClient.execute({
            delegate: true,
            feeToken: {
                address: tokenAddress,
                chainId,
            },
            instructions: [performSwapIx, approveMorphoIx, supplyWETHtoMORPHOIx],
        });

        const { hash } = await MeeClient.waitForSupertransactionReceipt({ hash: executeHash });

        return hash;
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

const getIxs = async (tokenAddress: Address, nexusAccount: MultichainSmartAccount, amountOutMin: bigint) => {
    const minOutAmount = (amountOutMin * 99n) / 100n; // 1% spillage buffer

    const performSwapIx = await nexusAccount.buildComposable({
        type: "default",
        data: {
            chainId,
            abi: ROUTER_ABI,
            to: BASE_V3_ROUTER,
            functionName: "exactInputSingle",
            args: [
                {
                    tokenIn: tokenAddress,
                    amountIn: runtimeERC20BalanceOf({
                        tokenAddress,
                        targetAddress: nexusAccount.addressOn(chainId, true),
                        constraints: [greaterThanOrEqualTo(minOutAmount)],
                    }),
                    tokenOut: BASE_WETH,
                    recipient: nexusAccount.addressOn(chainId, true),
                    fee: 100,
                    amountOutMinimum: minOutAmount,
                    sqrtPriceLimitX96: 0n,
                },
            ],
        },
    });

    const approveMorphoIx = await nexusAccount.buildComposable({
        type: "approve",
        data: {
            spender: MORPHO_RE7_POOL,
            chainId,
            tokenAddress: BASE_WETH,
            amount: runtimeERC20BalanceOf({
                tokenAddress: BASE_WETH,
                targetAddress: nexusAccount.addressOn(chainId, true),
                constraints: [greaterThanOrEqualTo(minOutAmount)],
            }),
        },
    });

    const supplyWETHtoMORPHOIx = await nexusAccount.buildComposable({
        type: "default",
        data: {
            abi: MORPH_ABI,
            to: MORPHO_RE7_POOL,
            chainId,
            functionName: "deposit",
            args: [
                runtimeERC20BalanceOf({
                    tokenAddress: BASE_WETH,
                    targetAddress: nexusAccount.addressOn(chainId, true),
                    constraints: [greaterThanOrEqualTo(minOutAmount)],
                }),
                nexusAccount.addressOn(chainId, true),
            ],
        },
    });

    return { supplyWETHtoMORPHOIx, approveMorphoIx, performSwapIx };
};

// use formatEther(), to get the exact eth amount from the bigint
export const getTokenToEthQuote = async (token: tokenType, amount: string) => {
    try {
        const decimals = token === "USDC" ? 6 : 18;
        const tokenInUnits = parseUnits(amount, decimals);
        const tokenAddress = TOKEN_ADDRESSES[token] as Address;

        const amountOut = await publicClient.readContract({
            address: BASE_V2_QUOTER,
            abi: QUOTE_ABI,
            functionName: "quoteExactInputSingle",
            args: [
                tokenAddress,
                BASE_WETH,
                500, // spillage set to 0.05%
                tokenInUnits,
                0n, // No price limit
            ],
        });

        return amountOut;
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};
