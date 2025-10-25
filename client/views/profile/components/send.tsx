import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, useState } from "react";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { useTokenPrice } from "@/api/get-token-price";
import { Button } from "@/components/ui/button";
import { cn, formatUSD, tokenInputField } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";

export function UserProfileSend() {
    const { balanceInToken, token, tokenAddress } = useUserProfileDrawerStore(
        useShallow((state) => ({
            token: state.payload?.token,
            balanceInToken: state.payload?.balanceInToken,
            tokenAddress: state.payload?.tokenAddress as Address,
        })),
    );

    const { data: tokenPrices } = useTokenPrice(tokenAddress);
    const usdPrice = tokenPrices ? Number(tokenPrices.usdPrice) : 0;

    const [recieverTabState, setRecieverTabState] = useState<RecieverTabState>(() => ({
        receiver: "",
        amountInToken: "",
        percentage: null,
    }));

    const amountInUsd = String(Number(recieverTabState.amountInToken) * usdPrice);
    function handleAmountInTokenChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = tokenInputField(event.target.value);

        setRecieverTabState((state) => ({
            ...state,
            amountInToken: inputValue,
            percentage: null,
        }));
    }

    function handleTipPercentage(value: string) {
        if (!tokenPrices) return;

        const percent = Number(value.replace("%", "")) / 100;
        const balance = Number(balanceInToken) || 0;

        setRecieverTabState((state) => ({
            ...state,
            amountInToken: (balance * percent).toFixed(6),
            percentage: value,
        }));
    }

    return (
        <section className="p-4">
            <div>
                <input
                    type="text"
                    value={recieverTabState.receiver}
                    onChange={(event) => setRecieverTabState((state) => ({ ...state, receiver: event.target.value }))}
                    placeholder="Enter a username or Base address"
                    className="bg-blue100 w-full rounded-lg p-2 text-sm font-light text-white/70 placeholder:text-white/50"
                />
            </div>

            <section className="flex flex-col items-center justify-center">
                <h3 className="text-blue100 mt-4 text-xs">Enter amount</h3>

                <div className="border-blue100 mt-px mb-2.5 flex h-25 w-full flex-col items-center justify-center rounded-xl border-2">
                    <div className="space-x-px text-2xl">
                        <input
                            type="text"
                            onChange={handleAmountInTokenChange}
                            value={recieverTabState.amountInToken}
                            placeholder="0.00"
                            className="max-w-30 focus:outline-none"
                            style={{
                                width: `${recieverTabState.amountInToken.length || 1}ch`,
                                color: recieverTabState.amountInToken ? "black" : "gray",
                            }}
                        />
                        <span> {token}</span>
                    </div>
                    <span className="text-base text-gray-500">{formatUSD(amountInUsd)}</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                    {["10%", "25%", "50%", "100%"].map((value, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleTipPercentage(value)}
                            className={cn(
                                "border-blue100 relative overflow-hidden rounded-xs border px-4 py-1 text-sm font-light transition",
                                recieverTabState.percentage === value ? "text-white" : "hover:bg-blue100/10 text-black",
                            )}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                        >
                            {value}

                            <AnimatePresence>
                                {recieverTabState.percentage === value ? (
                                    <motion.span
                                        layoutId="activePercentageHighlight"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="bg-blue100 absolute inset-0 -z-10"
                                    />
                                ) : null}
                            </AnimatePresence>
                        </motion.button>
                    ))}
                </div>
            </section>

            <Button className="bg-blue100 mt-5 h-13.5 w-full">
                <span className="text-xl">Send</span>
            </Button>
        </section>
    );
}
