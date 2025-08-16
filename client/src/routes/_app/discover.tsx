import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { getLeaderboard } from "@/api/get-leaderboard";
import { PageContentLayout } from "@/components/layouts/main-content";
import { useDiscoverSearchStore } from "@/store/discover-search";
import { logger } from "@/utils/logger";
import { StreamLeader } from "@/views/discover/components/article";
import { LeaderboardStreamerContextProvider } from "@/views/discover/context";

export const Route = createFileRoute("/_app/discover")({
    component: () => <Page />,
});

function Page() {
    const { isVisible } = useDiscoverSearchStore();

    const { data, error, isPending } = useQuery(getLeaderboard());

    if (error) return <>error</>;

    logger({ data, isPending });

    const dummy = data?.dummyData.leaderboard ?? [];

    return (
        <PageContentLayout>
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
                {[...dummy].map((value, index) => (
                    <LeaderboardStreamerContextProvider key={index} {...value}>
                        <StreamLeader counter={index + 1} />
                    </LeaderboardStreamerContextProvider>
                ))}
            </motion.footer>
        </PageContentLayout>
    );
}
