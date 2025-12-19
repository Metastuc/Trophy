import { EIP1193Provider, useSignTypedData, useWallets } from "@privy-io/react-auth";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { type Address } from "viem";

import { Button } from "@/components/ui/button";
import { API_ENDPOINTS, CLIENT_CONSTANTS } from "@/lib/constants";
import { buyCreatorToken, getTokenSwapQuote, sellCreatorToken } from "@/lib/flaunch";
import { formatEtherToToken } from "@/lib/utils";
import { makeRequest } from "#~/utils/axios.ts";

import { TradeDrawerContext } from "./hooks";

type TradeDrawerContextProviderProps = PropsWithChildren<TradeDrawer>;

export function TradeDrawerContextProvider({ children, streamer }: TradeDrawerContextProviderProps) {
    const { wallets } = useWallets();
    const { signTypedData } = useSignTypedData();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [drawerData, setDrawerData] = useState<TradeDrawerDataState>(() => ({
        from: {
            type: "native",
            token: "ETH",
            amount: "",
            balance: "0",
            usdPrice: "",
        },
        to: {
            type: "erc20",
            token: streamer?.tokenAddress as Address,
            amount: "",
            balance: "0",
            usdPrice: "",
        },
    }));

    const handleSwap = useCallback(
        async function handleSwap() {
            try {
                if (!wallets[0]) {
                    throw new Error("No wallet connected");
                }

                await wallets[0].switchChain(CLIENT_CONSTANTS.CURRENT_NETWORK.id);
                const provider: EIP1193Provider = await wallets[0].getEthereumProvider();

                let hash: `0x${string}`;
                // const token = "ETH";

                if (drawerData.from.type === "native") {
                    hash = await buyCreatorToken({
                        coinAddress: streamer?.tokenAddress as Address,
                        amount: drawerData.from.amount,
                        provider,
                        signTypedData,
                        token: drawerData.from.token,
                        address: wallets[0].address as Address,
                    });

                    await makeRequest({
                        method: "POST",
                        url: API_ENDPOINTS.TRANSACTIONS.STORE_TOKEN_PURCHASE,
                        data: {
                            amountIn: drawerData.from.amount,
                            amountOut: drawerData.to.amount,
                            buyerAddress: wallets[0].address,
                            creatorUsername: streamer?.username,
                            from: drawerData.from.token,
                            to: drawerData.to.token,
                            txHash: hash,
                        },
                    });
                } else {
                    hash = await sellCreatorToken({
                        coinAddress: streamer?.tokenAddress as Address,
                        amount: drawerData.from.amount,
                        provider,
                        signTypedData,
                        token: drawerData.to.token,
                        address: wallets[0].address as Address,
                    });
                }

                // await makeRequest({
                //     method: "POST",
                //     url: "/save-volume",
                //     data: {
                //         amount:
                //             drawerData.from.type === "native"
                //                 ? Number(drawerData.from.amount)
                //                 : Number(drawerData.to.amount),
                //     },
                // });

                toast.success("Token swapped successfully!", {
                    duration: 5000,
                    description: (
                        <Button className="text-blue-500 underline" variant="link">
                            <a
                                href={`${CLIENT_CONSTANTS.TX_SCAN_URL(hash as string)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View on BaseScan
                            </a>
                        </Button>
                    ),
                });
            } catch (error) {
                console.error("Swap failed:", error);
            }
        },
        [
            drawerData.from.amount,
            drawerData.from.token,
            drawerData.from.type,
            drawerData.to.amount,
            drawerData.to.token,
            signTypedData,
            streamer?.tokenAddress,
            streamer?.username,
            wallets,
        ],
    );

    const value = useMemo(
        () => ({
            closeDrawer: () => setIsDrawerOpen(false),
            drawerData,
            handleSwap,
            isDrawerOpen,
            openDrawer: () => setIsDrawerOpen(true),
            setDrawerData,
            swapSides() {
                setDrawerData(function (state) {
                    const swapped = { from: state.to, to: state.from };

                    if (swapped.from.amount && Number(swapped.from.amount) > 0)
                        getTokenSwapQuote({
                            amount: swapped.from.amount,
                            coinAddress: streamer?.tokenAddress as Address,
                            isToCreatorToken: swapped.from.type === "native",
                            token: swapped.from.token,
                        }).then(function (quote) {
                            setDrawerData(() => ({
                                ...swapped,
                                to: {
                                    ...swapped.to,
                                    amount: formatEtherToToken({
                                        number: quote,
                                        toCreatorToken: swapped.from.type === "native",
                                    }),
                                },
                            }));
                        });

                    return swapped;
                });
            },
            streamer,
        }),
        [isDrawerOpen, streamer, drawerData, handleSwap],
    );

    return <TradeDrawerContext.Provider value={value}>{children}</TradeDrawerContext.Provider>;
}
