import { EIP1193Provider, useSignTypedData,useWallets } from "@privy-io/react-auth";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { type Address,formatEther } from "viem";

import { network } from "@/lib/constants";
// import { buyCreatorToken } from "@/lib/flaunch";
import { flaunchClient, getSwapQuote, sellCreatorToken } from "@/lib/flaunch";

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
                //     wallets[0].address as Addreconst flaunch = flaunchClient(provider, address);ss,
                // );

                const q = await getSwapQuote(provider,
                    false,
                    drawerData.sellAmount,
                    "0x4d3efd7dca802e19d213bfc4f12b0576416a583a"
                )

                console.log("eth: ", formatEther(q))

                const flaunch = flaunchClient(provider, wallets[0].address as Address);
                const { typedData, permitSingle } = await flaunch.getPermit2TypedData("0x4d3efd7dca802e19d213bfc4f12b0576416a583a" as Address);
                console.log({ typedData });
                typedData.message.details.amount = typedData.message.details.amount.toString();
                typedData.message.sigDeadline = typedData.message.sigDeadline.toString();
                console.log({ new: typedData });
                const { signature } = await signTypedData(typedData, { address: wallets[0].address });
                console.log({ signature });

                await sellCreatorToken(
                    "0x4d3efd7dca802e19d213bfc4f12b0576416a583a" as Address,
                    drawerData.sellAmount,
                    provider,
                    signTypedData,
                    wallets[0].address as Address,
                    signature,
                    permitSingle
                )
            } catch (error) {
                console.error("Swap failed:", error);
                // optionally show a toast or error UI here
            }
        },
        [drawerData, signTypedData, wallets],
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
