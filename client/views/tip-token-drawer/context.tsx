import { usePrivy, useWallets } from "@privy-io/react-auth";
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";
import { useChainId, useSwitchChain } from "wagmi";

import { Button } from "@/components/ui/button";
import { API_ENDPOINTS, CLIENT_CONSTANTS } from "@/lib/constants";
import { tipERC20, tipEther } from "@/lib/tip";
import { makeRequest } from "#~/utils/axios.ts";
import { sleep } from "#~/utils/sleep.ts";

import { TOKENS } from "./components/tokens";
import { TipDrawerContext } from "./hooks";

type TipDrawerContextProviderProps = PropsWithChildren<TipDrawerProps>;

export function TipDrawerContextProvider({ children, streamer }: TipDrawerContextProviderProps) {
    const chainId = useChainId();
    const { wallets } = useWallets();
    const { connectWallet } = usePrivy();
    const { switchChainAsync } = useSwitchChain();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [shouldReopenDrawer, setShouldReopenDrawer] = useState<boolean>(false);

    const [tipDrawerState, setTipDrawerState] = useState<TipDrawerState>(() => ({
        amountInToken: "",
        amountInUsd: "",
        senderAvailableBalanceInToken: "",
        senderAvailableBalanceInUsd: "",
        token: TOKENS[0].value,
        tokenAddress: TOKENS[0].address,
    }));

    const [userWalletState, setUserWalletState] = useState<TipDrawerWalletState>(() => ({
        address: undefined,
        provider: undefined,
        walletType: undefined,
    }));

    const handleSendTip = useCallback(
        async function () {
            if (parseFloat(tipDrawerState.amountInUsd) > CLIENT_CONSTANTS.MAX_TIP_AMOUNT_USD) {
                toast.error(`Maximum tip amount is ${CLIENT_CONSTANTS.MAX_TIP_AMOUNT_USD.toLocaleString("en-US")} USD`);
                return;
            }

            if (!userWalletState.provider || !userWalletState.address) {
                toast.error("Please connect your wallet");
                setIsDrawerOpen(false);
                connectWallet();
                return;
            }

            if (chainId !== CLIENT_CONSTANTS.CURRENT_NETWORK.id) {
                toast.error("Please switch to the correct network");
                await switchChainAsync({ chainId: CLIENT_CONSTANTS.CURRENT_NETWORK.id });
                return;
            }

            const promise = (async function () {
                let hash = undefined as string | undefined;

                if (tipDrawerState.token === "ETH") {
                    hash = await tipEther({
                        amount: tipDrawerState.amountInToken,
                        provider: userWalletState.provider,
                        recipientAddress: streamer?.walletAddress as Address,
                        senderAddress: userWalletState.address as Address,
                    });
                } else {
                    hash = await tipERC20({
                        amount: tipDrawerState.amountInToken,
                        provider: userWalletState.provider,
                        recipientAddress: streamer?.walletAddress as Address,
                        senderAddress: userWalletState.address as Address,
                        token: tipDrawerState.token,
                        wallet: userWalletState.walletType as string,
                    });
                }

                return hash;
            })();

            toast.promise(promise, {
                loading: "Sending tip...",
                success: function (hash) {
                    makeRequest<undefined>({
                        url: API_ENDPOINTS.TIPS.STORE_TIP,
                        method: "POST",
                        data: {
                            amountInToken: tipDrawerState.amountInToken,
                            amountInUsd: parseFloat(tipDrawerState.amountInUsd),
                            chainId: CLIENT_CONSTANTS.CURRENT_NETWORK.id,
                            recipient: streamer?.walletAddress as Address,
                            sender: userWalletState.address as Address,
                            token: tipDrawerState.token,
                            tokenAddress: tipDrawerState.tokenAddress,
                            txHash: hash,
                        },
                    });

                    return (
                        <div>
                            <p>Tip sent successfully!</p>
                            <Button className="text-blue-500 underline" variant="link">
                                <a
                                    href={CLIENT_CONSTANTS.TX_SCAN_URL(hash as string)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on BaseScan
                                </a>
                            </Button>
                        </div>
                    );
                },
                error: "Failed to send tip.",
            });
        },
        [
            chainId,
            connectWallet,
            streamer?.walletAddress,
            switchChainAsync,
            tipDrawerState.amountInToken,
            tipDrawerState.amountInUsd,
            tipDrawerState.token,
            tipDrawerState.tokenAddress,
            userWalletState.address,
            userWalletState.provider,
            userWalletState.walletType,
        ],
    );

    useEffect(
        function () {
            if (wallets.length === 0) return;

            (async function () {
                const wallet = wallets[0];

                setUserWalletState({
                    address: wallet.address as Address,
                    provider: await wallet.getEthereumProvider(),
                    walletType: wallet.walletClientType,
                });
            })();
        },
        [wallets],
    );

    useEffect(
        function () {
            if (wallets.length > 0 && shouldReopenDrawer) {
                let canceled = false;

                (async () => {
                    await sleep(2000);
                    if (!canceled) setIsDrawerOpen(true);
                    setShouldReopenDrawer(false);
                })();

                return () => {
                    canceled = true;
                };
            }
        },
        [wallets, shouldReopenDrawer],
    );

    const value = useMemo(
        () => ({
            isDrawerOpen,
            closeDrawer: () => setIsDrawerOpen(false),
            openDrawer: () => setIsDrawerOpen(true),
            streamer,
            tipDrawerState,
            setTipDrawerState,
            handleSendTip,
        }),
        [isDrawerOpen, streamer, tipDrawerState, handleSendTip],
    );

    return <TipDrawerContext.Provider value={value}>{children}</TipDrawerContext.Provider>;
}
