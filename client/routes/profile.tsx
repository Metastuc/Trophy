import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TvMinimalPlay, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { getMyProfile } from "@/api/get-user";
import { PageContentLayout } from "@/components/layout/page-content";
import { useAuthenticationStore } from "@/hooks/authentication";
import { useTabSwitcher } from "@/hooks/tab-switch";
import { About } from "@/views/profile/components/about";
import { UserProfileDrawer } from "@/views/profile/components/drawer";
import { Streams } from "@/views/profile/components/streams";
import { TabHeader } from "@/views/profile/components/tab";
import { UserWallet } from "@/views/profile/components/wallet";
import { UserProfileContextProvider } from "@/views/profile/context";

export const Route = createFileRoute("/profile")({
    component: RouteComponent,
});

function RouteComponent() {
    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

    const { data, error, isPending } = useQuery({
        queryKey: ["get-my-profile"],
        queryFn: async () => await getMyProfile(),
        enabled: !!isAuthenticated,
    });

    const { activeTab, handleTabClick } = useTabSwitcher<ProfileScreens>("wallet");

    if (error) return <div>{error.message}</div>;

    return (
        <PageContentLayout className="space-y-16.5 !px-0">
            {data ? (
                <UserProfileContextProvider profileData={data} isCurrentUser={true} isPending={isPending}>
                    <About />

                    <footer className="border-blue100 rounded-t-xl border-t">
                        <div className="relative flex items-center justify-center px-4">
                            <TabHeader
                                tabs={[
                                    { id: "wallet", label: "Wallet", icon: <Wallet /> },
                                    { id: "streams", label: "Streams", icon: <TvMinimalPlay /> },
                                ]}
                                activeTab={activeTab}
                                onTabClick={handleTabClick}
                            />

                            <aside className="w-full overflow-hidden">
                                <AnimatePresence mode="wait" initial={false}>
                                    {activeTab === "wallet" ? (
                                        <motion.div
                                            key="wallet"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <UserWallet />
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

                    <UserProfileDrawer />
                </UserProfileContextProvider>
            ) : (
                <>no data</>
            )}
        </PageContentLayout>
    );
}
