import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, BanknoteArrowDown, Receipt } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { getUserWalletTokenBalances } from "@/api/get-user";
import { ARROW_DOWN_FILLED } from "@/assets/icons";
import { useAuthenticationStore } from "@/hooks/authentication";
import { useTabSwitcher } from "@/hooks/tab-switch";
import { cn, formatUSD } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";
import { Crypto } from "./crypto";
import { TabHeader } from "./tab";

export function UserWallet() {
    const openDrawer = useUserProfileDrawerStore((state) => state.openDrawer);
    const { isAuthenticated, walletAddress } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            walletAddress: state.user?.wallet?.address as Address,
        })),
    );

    const { data, error, isPending } = useQuery({
        queryKey: ["user", "user-wallet-token-balances", walletAddress],
        queryFn: async () => await getUserWalletTokenBalances({ walletAddress }),
        enabled: !!isAuthenticated,
    });

    const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher<WalletScreens>("crypto");
    const [totalBalance, setTotalBalance] = useState("0.00");

    useEffect(() => {
        if (!data) return;

        let balance = 0;

        for (const tokenData of data) {
            balance += Number(tokenData.balance);
        }

        setTotalBalance(formatUSD(balance.toString()));
    }, [data]);

    return (
        <section className="my-4">
            <header className="flex flex-col">
                <span className="text-blue100 text-xs">Total Money</span>
                <b className="text-2xl font-medium">${totalBalance}</b>
                <div className=" flex items-center justify-start gap-1">
                    <i className="size-2 rotate-180 text-[#2DC24E]">
                        <ARROW_DOWN_FILLED />
                    </i>
                    <span className="pt-0.5 text-[.5rem] text-black/50">0.00%</span>
                </div>
            </header>

            <main className="mt-5 mb-7.5 flex items-center gap-5">
                <button
                    className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white"
                    onClick={() => openDrawer({ view: "add", tab: "receive" })}
                >
                    <span className="pt-0.5 text-xs">Add money</span>
                    <i className="size-3">
                        <BadgeDollarSign />
                    </i>
                </button>

                <button
                    className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white"
                    onClick={() => openDrawer({ view: "withdraw" })}
                >
                    <span className="pt-0.5 text-xs">Withdraw</span>
                    <i className="size-3 text-[#FE1313]">
                        <BanknoteArrowDown />
                    </i>
                </button>

                <div
                    className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white"
                    onClick={() => openDrawer({ view: "earned" })}
                >
                    <i className="size-3">
                        <Receipt />
                    </i>
                    <b className="pt-0.75 text-xs font-normal text-[#2DC24E]">{"0.00"}</b>
                    <span className="pt-0.5 text-xs">earned</span>
                </div>
            </main>

            <footer className="flex w-full flex-col items-center justify-center">
                {/* <button onClick={() => openDrawer({ view: "add", tab: "send" })}>trigger send asset</button> */}

                <TabHeader
                    tabs={[
                        { id: "crypto", label: "Crypto" },
                        { id: "trophs", label: "Trophs" },
                    ]}
                    activeTab={activeTab}
                    onTabClick={handleTabClick}
                    styles={{
                        wrapper: "static w-4/5",
                        list_wrapper: "mx-auto",
                        list_button: (id) => cn("w-full", tabIsActive(id) ? "text-blue100" : "text-blue100/75"),
                        indicator: "bottom-[0.25px] h-[.0625rem]",
                    }}
                />

                <aside className="w-full overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                        {activeTab === "crypto" ? (
                            <motion.div
                                key="crypto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.15 }}
                                className="space-y-8 p-4"
                            >
                                <Crypto data={data} isPending={isPending} error={error} />
                            </motion.div>
                        ) : null}

                        {activeTab === "trophs" ? (
                            <motion.div
                                key="trophs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.15 }}
                                className="p-4"
                            >
                                {/* <UserProfileReceive /> */}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </aside>
            </footer>
        </section>
    );
}
