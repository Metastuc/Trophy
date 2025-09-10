import { EIP1193Provider, useSignTypedData,useWallets } from "@privy-io/react-auth";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import type { Address } from "viem";

import { network } from "@/lib/constants";
// import { buyCreatorToken } from "@/lib/flaunch";
import { sellCreatorToken } from "@/lib/flaunch";

import { TradeDrawerContext } from "./hooks";

type TradeDrawerContextProvider = PropsWithChildren<TradeDrawer>;

export function TradeDrawerContextProvider({ children, streamer }: TradeDrawerContextProvider) {
    const { wallets } = useWallets();
    const { signTypedData } = useSignTypedData();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [drawerData, setDrawerData] = useState<TradeDrawerDataState>(() => ({
        buyAmount: "",
        buyBalance: "",
        buyToken: "",
        sellAmount: "",
        sellBalance: "",
        sellToken: "ETH",
    }));

    const handleSwap = useCallback(
        async function handleSwap() {
            try {
                if (!wallets[0]) {
                    throw new Error("No wallet connected");
                }

                await wallets[0].switchChain(network.id);
                const provider: EIP1193Provider = await wallets[0].getEthereumProvider();


                console.log(drawerData);
                // await buyCreatorToken(
                //     streamer?.tokenAddress as Address,
                //     drawerData.sellAmount,
                //     provider,
                //     wallets[0].address as Address,
                // );

                await sellCreatorToken(
                    streamer?.tokenAddress as Address,
                    drawerData.sellAmount,
                    provider,
                    signTypedData,
                    wallets[0].address as Address,
                )
            } catch (error) {
                console.error("Swap failed:", error);
                // optionally show a toast or error UI here
            }
        },
        [drawerData, signTypedData, streamer?.tokenAddress, wallets],
    );

    const value = useMemo(
        () => ({
            isDrawerOpen,
            closeDrawer: () => setIsDrawerOpen(false),
            openDrawer: () => setIsDrawerOpen(true),
            streamer,
            drawerData,
            setDrawerData,
            handleSwap,
        }),
        [isDrawerOpen, streamer, drawerData, handleSwap],
    );

    return <TradeDrawerContext.Provider value={value}>{children}</TradeDrawerContext.Provider>;
}
