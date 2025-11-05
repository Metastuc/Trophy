import { EIP1193Provider } from "@privy-io/react-auth";
import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent } from "react";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { useTokenPrice } from "@/api/get-token-price";
import { Button } from "@/components/ui/button";
import { cn, formatUSD, getPriceInQuantity, tokenInputField } from "@/lib/utils";

import { Loading } from "@/components/ui/loading";
import { useAuthenticationStore } from "@/hooks/authentication";
import { useTransactionStore } from "@/hooks/transaction";
import { CLIENT_CONSTANTS } from "@/lib/constants";
import { toast } from "sonner";
import { useUserProfileDrawerStore } from "../store";

export function UserProfileSend() {
    const { address, provider } = useAuthenticationStore(
        useShallow((state) => ({
            address: state.user?.wallet?.address as Address,
            provider: state.user?.provider as EIP1193Provider,
        })),
    );

    const { balanceInToken, closeDrawer, token, tokenAddress } = useUserProfileDrawerStore(
        useShallow((state) => ({
            balanceInToken: state.payload?.balanceInToken,
            closeDrawer: state.closeDrawer,
            token: state.payload?.token,
            tokenAddress: state.payload?.tokenAddress as Address,
        })),
    );

    const { amount, percentage, recipientAddress, setField, transfer, isPending } = useTransactionStore(
        useShallow((state) => ({
            amount: state.amount || "",
            isPending: state.isLoading,
            percentage: state.percentage,
            recipientAddress: state.recipientAddress,
            setField: state.setField,
            transfer: state.transfer,
        })),
    );

    const { data: tokenPrices } = useTokenPrice(tokenAddress);
    const usdPrice = tokenPrices ? Number(tokenPrices.usdPrice) : 0;
    const amountInUsd = String(Number(amount) * usdPrice);

    function handleAmountInTokenChange(event: ChangeEvent<HTMLInputElement>) {
        setField({ key: "amount", value: tokenInputField(event.target.value) });
        setField({ key: "percentage", value: undefined });
    }

    function handleTipPercentage(value: string) {
        if (!tokenPrices) return;

        const percent = Number(value.replace("%", "")) / 100;
        const balance = Number(balanceInToken) || 0;

        setField({
            key: "amount",
            value: getPriceInQuantity({ price: `${balance}`, quantity: `${percent}` }).toFixed(6),
        });
        setField({ key: "percentage", value });
    }

    return (
        <section className="p-4">
            <div>
                <input
                    type="text"
                    value={recipientAddress}
                    onChange={(event) => setField({ key: "recipientAddress", value: event.target.value })}
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
                            value={amount}
                            placeholder="0.00"
                            className="max-w-30 focus:outline-none"
                            style={{
                                width: `${amount.length || 1}ch`,
                                color: amount ? "black" : "gray",
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
                                percentage === value ? "text-white" : "hover:bg-blue100/10 text-black",
                            )}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                        >
                            {value}

                            <AnimatePresence>
                                {percentage === value ? (
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

            <Button
                onClick={async () => {
                    const promise = (async () => {
                        const hash = await transfer({ address, provider });
                        closeDrawer();
                        return hash;
                    })();

                    toast.promise(promise, {
                        loading: "Sending...",
                        success: (hash) => (
                            <div>
                                <p>Send successful!</p>
                                <Button variant="link" className="text-blue-500 underline">
                                    <a
                                        href={CLIENT_CONSTANTS.TX_SCAN_URL(hash as Address)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View on BaseScan
                                    </a>
                                </Button>
                            </div>
                        ),
                        error: (error) => error?.message || "Send failed",
                    });
                }}
                className="bg-blue100 mt-5 h-13.5 w-full"
                disabled={isPending}
            >
                {isPending ? <Loading styles={{ icon: "text-white" }} /> : <span className="text-xl">Send</span>}
            </Button>
        </section>
    );
}
