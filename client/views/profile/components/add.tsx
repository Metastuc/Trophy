import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";
import { useShallow } from "zustand/shallow";

import { useTabSwitcher } from "@/hooks/tab-switch";
import { cn } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";
import { UserProfileReceive } from "./receive";
import { UserProfileSend } from "./send";
import { TabHeader } from "./tab";

export function Add() {
    const { addViewCurentTab, payload } = useUserProfileDrawerStore(
        useShallow((state) => ({
            addViewCurentTab: state.addViewCurentTab,
            payload: state.payload,
        })),
    );

    const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher<AddDrawerTab>(addViewCurentTab as AddDrawerTab);

    return (
        <Fragment>
            <TabHeader
                tabs={[
                    { id: "send", label: "Send", disabled: !payload },
                    { id: "receive", label: "Receive" },
                ]}
                activeTab={activeTab}
                onTabClick={handleTabClick}
                styles={{
                    wrapper: "static border-b w-full transition-all duration-200",
                    list_wrapper: "mx-auto",
                    list_item: (id) =>
                        cn(
                            "w-full flex items-center justify-center border-b",
                            tabIsActive(id) ? "border-b-blue100" : "border-b-gray-300",
                        ),
                    list_button: (id) => cn("w-full", tabIsActive(id) ? "text-blue100" : "text-blue100/75"),
                    indicator: "bottom-[0.25px] h-[.0625rem] hidden",
                }}
            />

            <aside className="w-full overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    {activeTab === "send" ? (
                        <motion.div
                            key="send"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.15 }}
                        >
                            <UserProfileSend />
                        </motion.div>
                    ) : null}

                    {activeTab === "receive" ? (
                        <motion.div
                            key="receive"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.15 }}
                        >
                            <UserProfileReceive />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </aside>
        </Fragment>
    );
}
