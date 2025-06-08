import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import { GO_LIVE } from "@/assets/icons";
import MainContentLayout from "@/views/main-content";
import { TabButton } from "@/views/stream/components/button";
import { useTabSwitcher } from "@/views/stream/hooks";

export const Route = createFileRoute("/stream")({
    component: function Page() {
        const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher("now");

        return (
            <MainContentLayout>
                <header className="[&>*]:font-jomhuria [&>*]:text-center [&>*]:leading-none">
                    <h1 className="text-[3.25rem]">you're about to go live!</h1>
                    <h3 className="text-base">
                        every streamer on trophy is a creator, you own your{" "}
                        <span className="text-blue100 font-jomhuria">$tream</span>
                    </h3>
                </header>

                <figure className="mx-auto mt-10 flex h-[13.75rem] w-[16.5rem] items-center justify-center">
                    <i>{GO_LIVE()}</i>
                </figure>

                <section>
                    <ul className="flex items-center justify-between border px-3">
                        <TabButton
                            handleClick={() => handleTabClick("now")}
                            isActive={tabIsActive("now")}
                            text={"Go live now"}
                        />

                        <TabButton
                            handleClick={() => handleTabClick("schedule")}
                            isActive={tabIsActive("schedule")}
                            text={"Schedule livestream"}
                        />
                    </ul>

                    <aside className="overflow-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                            {activeTab === "now" ? (
                                <motion.div
                                    key="now"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    render now
                                </motion.div>
                            ) : null}

                            {activeTab === "schedule" ? (
                                <motion.div
                                    key="schedule"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    render schedule
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </aside>
                </section>
            </MainContentLayout>
        );
    },
});
