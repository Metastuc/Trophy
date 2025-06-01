import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import StreamerBoard from "@/components/streamer-board";
import { useDiscoverSearchStore } from "@/store/discover-search";
import MainContentLayout from "@/views/main-content";

export const Route = createFileRoute("/discover")({
    component: function Page() {
        const { isVisible } = useDiscoverSearchStore();

        return (
            <MainContentLayout>
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

                <motion.main layout className="mt-8 mb-5">
                    <h1 className="text-blue100 text-center capitalize">creator leaderboard</h1>
                </motion.main>

                <motion.footer layout className="space-y-5">
                    {[...Array(10)].map((_, index) => (
                        <StreamerBoard key={index} counter={index + 1} />
                    ))}
                </motion.footer>
            </MainContentLayout>
        );
    },
});
