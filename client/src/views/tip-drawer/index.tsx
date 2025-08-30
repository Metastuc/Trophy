import { EIP1193Provider, useWallets } from "@privy-io/react-auth";
import { useDebounce } from "@uidotdev/usehooks";
import { CircleDollarSign } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";

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
import { StreamerLivePFP } from "@/components/ui/streamer-live-pfp";
import { tipUser } from "@/lib/tip";
import { logger } from "@/utils/logger";

import { TOKENS } from "./constants";
import { TipDrawerContextProvider } from "./context";
import { useTipDrawerContext } from "./hooks";

export function TipDrawer(props: TipDrawer) {
    logger({ props });

    return (
        <TipDrawerContextProvider {...props}>
            <TipDrawerInner />
        </TipDrawerContextProvider>
    );
}

interface TipDrawerState {
    amountInToken: number;
    amountInUsd: number;
    senderAvailableBalanceInToken: number;
    senderAvailableBalanceInUsd: number;
    token: string;
}

interface TipDrawerPrivyWalletState {
    provider?: EIP1193Provider;
    address?: string;
    walletType?: string;
}

function TipDrawerInner() {
    const { closeDrawer, isDrawerOpen, openDrawer, streamer } = useTipDrawerContext();
    const { wallets } = useWallets();

    const [privyWalletState, setProvyWalletState] = useState<TipDrawerPrivyWalletState>(() => ({
        provider: undefined,
        address: undefined,
        walletType: undefined,
    }));

    const [initialValues, setInitialValues] = useState<TipDrawerState>(() => ({
        amountInToken: 0,
        amountInUsd: 0,
        senderAvailableBalanceInToken: 0,
        senderAvailableBalanceInUsd: 0,
        token: "ETH",
    }));

    const debouncedAmountInToken = useDebounce(initialValues.amountInToken, 1000);
    const debouncedAmountInUsd = useDebounce(initialValues.amountInUsd, 1000);

    useEffect(
        function () {
            (async function () {
                const provider = await wallets[0].getEthereumProvider();
                const address = wallets[0].address;
                const walletType = wallets[0].walletClientType;
                setProvyWalletState({ provider, address, walletType });
            })();
        },
        [wallets],
    );

    function handleAmountInTokenChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const inputValue = event.target.value.replace(/\D/g, "");
        const parsedValue = inputValue === "" ? 0 : parseInt(inputValue);

        setInitialValues((state) => ({
            ...state,
            amountInToken: parsedValue === null || parsedValue <= 100 ? parsedValue : 100,
            // amountInUsd: Number(event.target.value) * (streamer?.priceInUsd || 0),
            
        }));
    }

    function handleTipPercentage(value: string) {
        console.log(value);
    }

    async function handleTip() {
        try {
            if (!privyWalletState.provider || !privyWalletState.address) throw new Error("Privy wallet not connected");

            const hash = await tipUser({
                amount: initialValues.amountInToken.toString(),
                provider: privyWalletState.provider,
                recipient: streamer?.walletAddress as string,
                token: initialValues.token as tokenType,
                userAddress: privyWalletState.address as Address,
                wallet: privyWalletState.walletType as string,
            });

            toast.success("Tip sent successfully!", {
                duration: 3000,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Drawer open={isDrawerOpen} onOpenChange={(isOpen) => (isOpen ? openDrawer() : closeDrawer())}>
            <DrawerTrigger asChild>
                <Button
                    variant="default"
                    className="flex h-6 w-20 items-center justify-center gap-1 rounded bg-gradient-to-b from-[#2D57FF] to-[#1B3499] p-0 text-white"
                >
                    <i className="size-4">
                        <CircleDollarSign />
                    </i>
                    <span className="pt-0.5 text-xs">Send tip</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-blue100 flex items-center gap-1 text-xl font-normal">
                        <i className="size-4">
                            <CircleDollarSign />
                        </i>
                        <span className="font-medium">Send tip to:</span>
                    </DrawerTitle>

                    <DrawerDescription className="flex items-center gap-1 text-xs font-light">
                        <aside className="flex size-7 items-center justify-center">
                            <StreamerLivePFP
                                isLive={false}
                                imageSrc={streamer?.profilePicture as string}
                                imageAlt={`${streamer?.username as string}-pfp`}
                            />
                        </aside>
                        <span className="text-black100 text-sm font-normal">@{streamer?.username}</span>
                    </DrawerDescription>
                </DrawerHeader>

                <main className="space-y-6 p-4">
                    <section>
                        <span className="text-blue100 pl-5 text-sm font-medium">Enter amount</span>

                        <div className="border-blue100 flex h-25 items-center justify-between rounded-xl border-2 p-4">
                            <aside className="flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center gap-2 text-2xl">
                                    <input
                                        value={initialValues.amountInToken}
                                        onChange={handleAmountInTokenChange}
                                        style={{
                                            width: `${String(initialValues.amountInToken || 0).length || 1}ch`,
                                            color: initialValues.amountInToken ? "black" : "gray",
                                        }}
                                        className="outline-none"
                                    />
                                    <span>{initialValues.token}</span>
                                </div>

                                <span className="text-base text-[#060606]/50">
                                    ${initialValues.amountInUsd.toFixed(2)}
                                </span>
                            </aside>

                            <aside className="flex flex-col items-center justify-center">
                                <span className="text-blue100 text-xs">Select token</span>

                                <Select
                                    value={initialValues.token}
                                    onValueChange={(value) => setInitialValues((state) => ({ ...state, token: value }))}
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
                                    ${initialValues.senderAvailableBalanceInUsd.toFixed(2)}
                                </span>
                                <span className="text-sm text-white/70">
                                    {initialValues.senderAvailableBalanceInToken.toFixed(2)} {initialValues.token}
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
                    <Button className="bg-blue100 mx-auto h-13.5 w-full rounded-lg" onClick={handleTip}>
                        <span className="text-xl font-normal">Send tip</span>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
