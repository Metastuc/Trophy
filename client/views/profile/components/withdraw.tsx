import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, useState } from "react";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { getUserWalletTokenBalances } from "@/api/get-user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOKENS } from "@/components/ui/tokens";
import { useAuthenticationStore } from "@/hooks/authentication";
import { cn, formatUSD } from "@/lib/utils";
import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";

export function Withdraw() {
    const { isAuthenticated, walletAddress } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            walletAddress: state.user?.wallet?.address as Address,
        })),
    );

    const { data } = useQuery({
        queryKey: ["user", "user-wallet-token-balances", walletAddress],
        queryFn: async () => await getUserWalletTokenBalances({ walletAddress }),
        enabled: !!isAuthenticated,
    });

    const [recieverTabState, setRecieverTabState] = useState<UserProfileWithdrawState>(() => ({
        amountInToken: "",
        percentage: null,
        reciever: "",
        token: TOKENS[0].value,
    }));

    const selectedToken = data?.find(
        (token) =>
            token.symbol === recieverTabState.token ||
            token.address === TOKEN_CONFIG[recieverTabState.token as keyof typeof TOKEN_CONFIG].address,
    );

    const usdPrice =
        selectedToken && Number(selectedToken.balance) > 0
            ? Number(selectedToken.usd_value) / Number(selectedToken.balance)
            : 0;

    const balanceInUsd = Number(recieverTabState.amountInToken || "0") * usdPrice;

    function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
        setRecieverTabState((state) => ({
            ...state,
            amountInToken: event.target.value,
            percentage: null,
        }));
    }

    function handleTipPercentage(value: string) {
        if (!selectedToken) return;

        const percent = Number(value.replace("%", "")) / 100;
        const balance = Number(selectedToken.balance) || 0;

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
                    value={recieverTabState.reciever}
                    onChange={(event) => setRecieverTabState((state) => ({ ...state, receiver: event.target.value }))}
                    placeholder="Enter a username or Base address"
                    className="bg-blue100 w-full rounded-lg p-2 text-sm font-light text-white/70 placeholder:text-white/50"
                />
            </div>

            <section className="flex flex-col items-center justify-center">
                <aside className="mt-8.5 mb-2.5 w-full">
                    <span className="text-blue100 pl-5 text-xs">Enter amount</span>

                    <div className="border-blue100 flex h-25 items-center justify-between rounded-xl border-2 p-4">
                        <aside className="flex flex-col items-start justify-center">
                            <div className="flex items-center justify-center gap-1 text-2xl">
                                <input
                                    value={recieverTabState.amountInToken}
                                    onChange={handleAmountChange}
                                    style={{
                                        width: `${recieverTabState.amountInToken.length || 1}ch`,
                                        color: recieverTabState.amountInToken ? "black" : "gray",
                                    }}
                                    className="max-w-30 outline-none"
                                    placeholder="0.00"
                                />
                                <span>{recieverTabState.token}</span>
                            </div>

                            <span className="text-base text-black/50">{formatUSD(balanceInUsd.toString())}</span>
                        </aside>

                        <aside className="flex flex-col items-center justify-center">
                            <Select
                                value={recieverTabState.token}
                                onValueChange={(value) =>
                                    setRecieverTabState((state) => ({
                                        ...state,
                                        amountInToken: "",
                                        percentage: null,
                                        token: value,
                                    }))
                                }
                            >
                                <SelectTrigger className="border-blue100 h-10.5! min-w-28 rounded-lg bg-[#1B1B1B] p-0 px-2">
                                    <SelectValue>
                                        {TOKENS.find((token) => token.value === recieverTabState.token)?.title}
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

                            <span className="text-blue100 mt-1 mr-auto text-xs">
                                Balance: {selectedToken?.balance ?? "0"}
                            </span>
                        </aside>
                    </div>
                </aside>

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
        </section>
    );
}
