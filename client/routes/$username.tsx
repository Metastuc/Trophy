import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { getUserProfile } from "@/api/get-user";
import { PageContentLayout } from "@/components/layout/page-content";
import { useTabSwitcher } from "@/hooks/tab-switch";
import { About } from "@/views/profile/components/about";
import { Streams } from "@/views/profile/components/streams";
import { TabHeader } from "@/views/profile/components/tab";
import { UserProfileContextProvider } from "@/views/profile/context";
import { toTime } from "#~/utils/time.ts";

export const Route = createFileRoute("/$username")({
    beforeLoad({ context, params }) {
        if (context.authenticationStore?.user?.backendUserData.user.username === params.username) {
            throw redirect({ to: "/profile" });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { activeTab, handleTabClick } = useTabSwitcher<ProfileScreens>("holdings");
    const { username } = Route.useParams();

    const { data, error, isPending } = useQuery({
        queryKey: ["get-user-profile"],
        queryFn: async () => await getUserProfile({ username }),
        refetchOnWindowFocus: false,
        staleTime: toTime({ unit: "minutes", value: 5, output: "milliseconds" }),
    });

    if (error) return <div>{error.message}</div>;

    return (
        <PageContentLayout className="space-y-16.5 !px-0">
            {data?.data ? (
                <UserProfileContextProvider isPending={isPending} profileData={data?.data} isCurrentUser={false}>
                    <About />

                    <footer className="border-blue100 rounded-t-xl border-t">
                        <div className="relative flex items-center justify-center px-4">
                            <TabHeader
                                tabs={[
                                    { id: "holdings", label: "Holdings", icon: <Wallet /> },
                                    { id: "streams", label: "Scheduled Streams" },
                                ]}
                                activeTab={activeTab}
                                onTabClick={handleTabClick}
                            />

                            <aside className="w-full overflow-hidden">
                                <AnimatePresence mode="wait" initial={false}>
                                    {activeTab === "holdings" ? (
                                        <motion.div
                                            key="wallet"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <span className="block h-20">
                                                {data.data.username} does not hold any creator token yet
                                            </span>
                                        </motion.div>
                                    ) : null}

                                    {activeTab === "streams" ? (
                                        <motion.div
                                            key="streams"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <Streams />
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </aside>
                        </div>
                    </footer>
                </UserProfileContextProvider>
            ) : null}
        </PageContentLayout>
    );
}
