import { useWallets } from "@privy-io/react-auth";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Address } from "viem";

import { CLIENT_CONSTANTS } from "@/lib/constants";

import { TradeDrawerContext } from "./hooks";

type TradeDrawerContextProviderProps = PropsWithChildren<TradeDrawerProps>;

export function TradeDrawerContextProvider({ children, streamer }: TradeDrawerContextProviderProps) {
    const { wallets } = useWallets();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [drawerData, setDrawerData] = useState<TradeDrawerDataState>(() => ({
        buyAmount: "",
        buyBalance: "",
        buyToken: streamer?.tokenAddress as Address,
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

                await wallets[0].switchChain(CLIENT_CONSTANTS.CURRENT_NETWORK.id);
                // const provider: EIP1193Provider = await wallets[0].getEthereumProvider();

                // await buyCreatorToken(
                //     streamer?.tokenAddress as Address,
                //     drawerData.buyAmount,
                //     provider,
                //     wallets[0].address as Address,
                // );
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Swap failed");
            }
        },
        [wallets],
    );

    const value = useMemo(
        () => ({
            drawerData,
            isDrawerOpen,
            streamer,
            closeDrawer: () => setIsDrawerOpen(false),
            handleSwap,
            openDrawer: () => setIsDrawerOpen(true),
            setDrawerData,
        }),
        [isDrawerOpen, streamer, drawerData, handleSwap],
    );

    return <TradeDrawerContext.Provider value={value}>{children}</TradeDrawerContext.Provider>;
}
