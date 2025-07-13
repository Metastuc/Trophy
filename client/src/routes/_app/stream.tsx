import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

import { SCHEDULE_STREAM, STREAM_NOW } from "@/assets/icons";
import { PageContentLayout } from "@/components/layouts/main-content";
import { TabButton } from "@/views/stream/components/button";
import { ScheduleStreamForm } from "@/views/stream/components/schedule-stream-form";
import { StreamNowForm } from "@/views/stream/components/stream-now-form";
import { useTabSwitcher } from "@/views/stream/hooks";

export const Route = createFileRoute("/_app/stream")({
    component: function Page() {
        const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher("now");
        const tabRefs = React.useRef<(HTMLLIElement | null)[]>([]);
        const [tabIndicator, setTabIndicator] = React.useState<{ left: string; width: string }>({
            left: "0px",
            width: "0px",
        });

        React.useEffect(
            function () {
                const index = activeTab === "now" ? 0 : 1;
                const tabEl = tabRefs.current[index];

                if (!tabEl) return;

                setTabIndicator({
                    left: `${tabEl?.offsetLeft}px`,
                    width: `${tabEl?.offsetWidth}px`,
                });
            },
            [activeTab],
        );

        return (
            <PageContentLayout>
                <header className="[&>*]:font-jomhuria [&>*]:text-center [&>*]:leading-none">
                    <h1 className="text-[3.25rem]">you're about to go live!</h1>
                    <h3 className="text-base">
                        every streamer on trophy is a creator, you own your{" "}
                        <span className="text-blue100 font-jomhuria">$tream</span>
                    </h3>
                </header>

                <figure className="mx-auto mt-10 flex h-[13.75rem] w-[16.5rem] items-center justify-center">
                    <img src="/go-live.svg" alt="go-live" />
                </figure>

                <section className="space-y-3">
                    <aside className="flex items-center justify-center overflow-hidden">
                        <ul className="bg-blue100 relative flex w-full items-center justify-between rounded-lg p-1">
                            <TabButton
                                icon={STREAM_NOW()}
                                handleClick={() => handleTabClick("now")}
                                isActive={tabIsActive("now")}
                                text={"Go live now"}
                                ref={(el: HTMLLIElement | null) => {
                                    tabRefs.current[0] = el;
                                }}
                            />

                            <TabButton
                                icon={SCHEDULE_STREAM()}
                                handleClick={() => handleTabClick("schedule")}
                                isActive={tabIsActive("schedule")}
                                text={"Schedule livestream"}
                                ref={(el: HTMLLIElement | null) => {
                                    tabRefs.current[1] = el;
                                }}
                            />

                            <motion.li
                                className="absolute z-0 h-[80%] rounded bg-white"
                                animate={{ left: tabIndicator.left, width: tabIndicator.width }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    duration: 0.15,
                                }}
                            />
                        </ul>
                    </aside>

                    <aside className="border-blue100/25 overflow-hidden rounded-lg border px-4 py-5">
                        <AnimatePresence mode="wait" initial={false}>
                            {activeTab === "now" ? (
                                <motion.div
                                    key="now"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <StreamNowForm />
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
                                    <ScheduleStreamForm />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </aside>
                </section>
            </PageContentLayout>
        );
    },
});
