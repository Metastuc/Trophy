import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import StreamerBoard from "@/components/streamer-board";
import { useDiscoverSearchStore } from "@/store/discover-search";

export const Route = createFileRoute("/discover")({
    component: function Page() {
        const { isVisible } = useDiscoverSearchStore();

        return (
            <section className="my-2 px-4">
                <AnimatePresence>
                    {isVisible ? (
                        <motion.header
                            className="flex h-6 w-full items-center justify-center border"
                            layout
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            search
                        </motion.header>
                    ) : null}
                </AnimatePresence>

                <motion.main layout>
                    <h1 className="capitalize">creator leaderboard</h1>
                </motion.main>

                <motion.footer layout className="space-y-5">
                    {[...Array(10)].map((_, index) => (
                        <StreamerBoard key={index} counter={index + 1} />
                    ))}
                </motion.footer>
            </section>
        );
    },
});
