import { AnimatePresence, motion } from "motion/react";

import { ARROW_DOWN_FILLED } from "@/assets/icons";
import { useTabSwitcher } from "@/hooks/tab-switch";
import { cn, formatUSD } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";
import { UserProfileReceive } from "./receive";
import { UserProfileSend } from "./send";
import { TabHeader } from "./tab";

export function Add() {
    const addViewCurentTab = useUserProfileDrawerStore((state) => state.addViewCurentTab);
    const token = useUserProfileDrawerStore((state) => state.payload?.token);

    const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher<AddDrawerTab>(addViewCurentTab as AddDrawerTab);

    return (
        <section className="">
            <div className="flex flex-col p-4 pt-0">
                <b className="text-2xl font-medium">{formatUSD("0")}</b>

                <div className=" flex items-center justify-start gap-1">
                    <span className="text-xs text-gray-500">0.00 {token}</span>

                    <i className="size-2 rotate-180 text-[#2DC24E]">
                        <ARROW_DOWN_FILLED />
                    </i>
                    <span className="pt-0.5 text-[.5rem] text-black/50">0.00%</span>
                </div>
            </div>

            <TabHeader
                tabs={[
                    { id: "send", label: "Send" },
                    { id: "receive", label: "Receive" },
                ]}
                activeTab={activeTab}
                onTabClick={handleTabClick}
                styles={{
                    wrapper: "static border-b w-full",
                    list_wrapper: "mx-auto",
                    list_item: (id) =>
                        cn(
                            "w-full flex items-center justify-center border-b",
                            tabIsActive(id) ? "border-b-blue100" : "border-b-gray-300",
                        ),
                    list_button: "w-full",
                    indicator: "bottom-[0.25px] h-[.0625rem] hidden",
                }}
            />

            <aside className="w-full overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    {activeTab === "send" ? (
                        <motion.div
                            key="send"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.15 }}
                        >
                            <UserProfileSend />
                        </motion.div>
                    ) : null}

                    {activeTab === "receive" ? (
                        <motion.div
                            key="receive"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.15 }}
                        >
                            <UserProfileReceive />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </aside>
        </section>
    );
}
