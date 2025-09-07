import { CircleDollarSign } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { useTokenPrice } from "@/api/get-token-price";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StreamerPFP } from "@/components/ui/streamer-pfp";
import { TOKEN_CONFIG } from "@/lib/constants";
import { formatToken, formatUSD, tokenInputField } from "@/lib/utils";
import { log } from "#~/utils/logger.ts";

import { TOKENS } from "./components/tokens";
import { TipDrawerContextProvider } from "./context";
import { useTipDrawerContext } from "./hooks";

export function TipDrawer({ trigger, ...rest }: TipDrawerProps) {
    return (
        <TipDrawerContextProvider {...rest}>
            <TipDrawerInner trigger={trigger} />
        </TipDrawerContextProvider>
    );
}

// interface TipDrawerPrivyWalletState {
//     provider?: EIP1193Provider;
//     address?: string;
//     walletType?: string;
// }

function TipDrawerInner({ trigger }: TipDrawerProps) {
    const { closeDrawer, isDrawerOpen, openDrawer, streamer } = useTipDrawerContext();
    // const { wallets } = useWallets();
    // const { connectWallet } = usePrivy();
    // const { address } = useAccount();

    // const [privyWalletState, setPrivyWalletState] = useState<TipDrawerPrivyWalletState>(() => ({
    //     provider: undefined,
    //     address: undefined,
    //     walletType: undefined,
    // }));

    const [initialValues, setInitialValues] = useState<TipDrawerState>(() => ({
        amountInToken: "",
        amountInUsd: "",
        senderAvailableBalanceInToken: "",
        senderAvailableBalanceInUsd: "",
        token: TOKENS[0].value,
        tokenAddress: TOKENS[0].address,
    }));

    // const [shouldReopenDrawer, setShouldReopenDrawer] = useState<boolean>(false);

    const { data: tokenPrices } = useTokenPrice(initialValues.tokenAddress);
    log.info({ data: tokenPrices });

    // const { data: balanceData } = useBalance({ address });

    // useEffect(
    //     function () {
    //         if (wallets.length === 0) return;

    //         (async function () {
    //             const wallet = wallets[0];
    //             await wallet.switchChain(network.id);
    //             const provider = await wallet.getEthereumProvider();
    //             const address = wallet.address;
    //             const walletType = wallet.walletClientType;
    //             setPrivyWalletState({ provider, address, walletType });
    //         })();
    //     },
    //     [wallets],
    // );

    function handleAmountInTokenChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = tokenInputField(event.target.value);

        setInitialValues((state) => ({
            ...state,
            amountInToken: inputValue,
            amountInUsd: `${tokenPrices ? Number(inputValue) * tokenPrices.usdPrice : 0}`,
        }));
    }

    function handleTipPercentage(value: string) {
        console.log(value);
    }

    // useEffect(() => {
    //     setInitialValues((state) => ({
    //         ...state,
    //         amountInUsd: tokenPrice ? Number(state.amountInToken || 0) * tokenPrice.usdPrice : 0,
    //     }));
    // }, [initialValues.amountInToken, tokenPrice]);

    // useEffect(() => {
    //     if (!balanceData || !tokenPrice) return;

    //     const tokenBalance = parseFloat(balanceData.formatted);
    //     const balanceInUsd = tokenBalance * tokenPrice.usdPrice;

    //     setInitialValues((state) => ({
    //         ...state,
    //         senderAvailableBalanceInToken: tokenBalance,
    //         senderAvailableBalanceInUsd: balanceInUsd,
    //     }));
    // }, [balanceData, tokenPrice]);

    // async function handleTip() {
    //     if (initialValues.amountInUsd > APPLICATION_CONSTANTS.MAX_TIP_AMOUNT_USD) {
    //         toast.error(
    //             `Maximum tip amount is ${APPLICATION_CONSTANTS.MAX_TIP_AMOUNT_USD.toLocaleString("en-US")} USD`,
    //         );
    //         return;
    //     }

    //     let hash: string | undefined;

    //     try {
    //         if (!privyWalletState.provider || !privyWalletState.address) {
    //             toast.error("Wallet not connected");
    //             setShouldReopenDrawer(true);
    //             closeDrawer();
    //             connectWallet();
    //             return;
    //         }

    //         if (initialValues.token === "ETH") {
    //             hash = await tipETH({
    //                 amount: initialValues.amountInToken.toString() || "0",
    //                 provider: privyWalletState.provider,
    //                 recipientAddress: streamer?.walletAddress as Address,
    //                 senderAddress: privyWalletState.address as Address,
    //             });
    //         }

    //         if (initialValues.token !== "ETH") {
    //             hash = await tipUser({
    //                 amount: initialValues.amountInToken.toString() || "0",
    //                 provider: privyWalletState.provider,
    //                 recipientAddress: streamer?.walletAddress as Address,
    //                 token: initialValues.token as TokenAddresses,
    //                 senderAddress: privyWalletState.address as Address,
    //                 wallet: privyWalletState.walletType as string,
    //             });
    //         }

    //         toast.success("Tip sent successfully!", {
    //             duration: 5000,
    //             description: (
    //                 <Button className="text-blue-500 underline" variant="link">
    //                     <a
    //                         href={`${APPLICATION_CONSTANTS.TX_SCAN_URL(hash as string)}`}
    //                         target="_blank"
    //                         rel="noopener noreferrer"
    //                     >
    //                         View on BaseScan
    //                     </a>
    //                 </Button>
    //             ),
    //         });

    //         closeDrawer();
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Failed to send tip.");
    //     }
    // }

    // useEffect(
    //     function () {
    //         if (wallets.length > 0 && shouldReopenDrawer) {
    //             let canceled = false;

    //             (async () => {
    //                 await sleep(2000);
    //                 if (!canceled) openDrawer();
    //                 setShouldReopenDrawer(false);
    //             })();

    //             return () => {
    //                 canceled = true;
    //             };
    //         }
    //     },
    //     [shouldReopenDrawer, wallets.length, openDrawer],
    // );

    return (
        <Drawer open={isDrawerOpen} onOpenChange={(isOpen) => (isOpen ? openDrawer() : closeDrawer())}>
            <DrawerTrigger asChild>
                {/* <Button
                    variant="default"
                    className="flex h-6 w-20 items-center justify-center gap-1 rounded bg-gradient-to-b from-[#2D57FF] to-[#1B3499] p-0 text-white"
                >
                    <i className="size-4">
                        <CircleDollarSign />
                    </i>
                    <span className="pt-0.5 text-xs">Send tip</span>
                </Button> */}

                {trigger}
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-blue100 flex items-center gap-1 text-xl font-normal">
                        <i className="size-4">
                            <CircleDollarSign />
                        </i>
                        <span className="font-medium">Send tip to:</span>
                    </DrawerTitle>

                    <DrawerDescription asChild>
                        <div className="flex items-center gap-1 text-xs font-light">
                            <aside className="flex size-7 items-center justify-center">
                                <StreamerPFP
                                    isLive={false}
                                    imageSrc={streamer?.profilePicture as string}
                                    imageAlt={`${streamer?.username as string}-pfp`}
                                />
                            </aside>
                            <span className="text-black100 text-sm font-normal">@{streamer?.username}</span>
                        </div>
                    </DrawerDescription>
                </DrawerHeader>

                <main className="space-y-6 p-4">
                    <section>
                        <span className="text-blue100 pl-5 text-sm font-medium">Enter amount</span>

                        <div className="border-blue100 flex h-25 items-center justify-between rounded-xl border-2 p-4">
                            <aside className="flex flex-col items-start justify-center">
                                <div className="flex items-center justify-center gap-1 text-2xl">
                                    <input
                                        value={initialValues.amountInToken}
                                        onChange={handleAmountInTokenChange}
                                        style={{
                                            width: `${initialValues.amountInToken.length || 1}ch`,
                                            color: initialValues.amountInToken ? "black" : "gray",
                                        }}
                                        className="max-w-[7.5rem] outline-none"
                                        placeholder="0.00"
                                    />
                                    <span>{initialValues.token}</span>
                                </div>

                                <span className="text-base text-[#060606]/50">
                                    {formatUSD(initialValues.amountInUsd || "0")}
                                </span>
                            </aside>

                            <aside className="flex flex-col items-center justify-center">
                                <span className="text-blue100 text-xs">Select token</span>

                                <Select
                                    value={initialValues.token}
                                    onValueChange={(value) =>
                                        setInitialValues((state) => ({
                                            ...state,
                                            token: value,
                                            tokenAddress: TOKEN_CONFIG[value as keyof typeof TOKEN_CONFIG].address,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="border-blue100 h-10.5! min-w-28 rounded-lg bg-[#1B1B1B] p-0 px-2">
                                        <SelectValue>
                                            {TOKENS.find((token) => token.value === initialValues.token)?.title}
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {TOKENS.map((token, index) => (
                                            <SelectItem key={index} value={token.value}>
                                                {token.render}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </aside>
                        </div>
                    </section>

                    <section className="flex items-center justify-between">
                        <aside>
                            <span className="text-blue100 text-xs font-light">Available balance</span>

                            <div className="bg-blue100/80 border-blue100 flex w-28 flex-col items-center rounded-lg border px-2 pt-3 pb-1">
                                <span className="text-xl text-white">
                                    {formatUSD(initialValues.senderAvailableBalanceInUsd || "0")}
                                </span>
                                <span className="text-sm text-white/70">
                                    {formatToken(initialValues.senderAvailableBalanceInToken || "0")}{" "}
                                    {initialValues.token}
                                </span>
                            </div>
                        </aside>

                        <aside>
                            <span className="text-blue100 text-xs font-light">
                                % of available balance to send as tip
                            </span>

                            <div className="space-x-2.5">
                                {["10%", "25%", "50%", "100%"].map((value, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTipPercentage(value)}
                                        className="border-blue100 rounded-lg border p-2 text-sm font-light"
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </aside>
                    </section>
                </main>

                <DrawerFooter>
                    <Button className="bg-blue100 mx-auto h-13.5 w-full rounded-lg" onClick={() => {}}>
                        <span className="text-xl font-normal">Send tip</span>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
