import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TvMinimalPlay, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useShallow } from "zustand/shallow";

import { getUser } from "@/api/get-user";
import { PageContentLayout } from "@/components/layouts/main-content";
import { useTabSwitcher } from "@/hooks/tab-switcher";
import { useAuthenticationStore } from "@/store/authentication";
import { About } from "@/views/user-profile/components/about";
import { Streams } from "@/views/user-profile/components/streams";
import { UserWallet } from "@/views/user-profile/components/wallet";
import { UserProfileContextProvider } from "@/views/user-profile/context";

export const Route = createFileRoute("/_app/profile")({
    component: () => <Page />,
});

function Page() {
    // const tabRefs = React.useRef<(HTMLLIElement | null)[]>([]);
    const { activeTab, handleTabClick } = useTabSwitcher<tProfileScreens>("wallet");
    // const [tabIndicator, setTabIndicator] = React.useState<{ left: string; width: string }>({
    //     left: "0px",
    //     width: "0px",
    // });

    const { isAuthenticated, username } = useAuthenticationStore(
        useShallow((state) => ({
            username: state.user?.backendUserData.user.username as string,
            isAuthenticated: state.isAuthenticated,
        })),
    );

    const { data, isPending, error } = useQuery(getUser({ username }));

    if (isPending && isAuthenticated) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading profile: {error.message}</div>;
    }

    const { streams, user } = data as tGetUserResponse;

    return (
        <PageContentLayout className="space-y-16.5 !px-0">
            <UserProfileContextProvider streams={streams} user={user} isCurrentUser={true}>
                <About />

                <footer className="border-blue100 rounded-t-xl border-t">
                    <div className="relative flex items-center justify-center px-4">
                        <aside className="absolute -top-6.5 w-4/5 overflow-hidden">
                            <ul className="flex items-center justify-between">
                                <li>
                                    <button
                                        className="text-blue100 flex items-center justify-center gap-1"
                                        onClick={() => handleTabClick("wallet")}
                                    >
                                        <i className="size-4">
                                            <Wallet />
                                        </i>
                                        <span>Wallet</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="text-blue100 flex items-center justify-center gap-1"
                                        onClick={() => handleTabClick("streams")}
                                    >
                                        <span>Streams</span>
                                        <i className="size-4">
                                            <TvMinimalPlay />
                                        </i>
                                    </button>
                                </li>
                            </ul>
                        </aside>

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
            </UserProfileContextProvider>
        </PageContentLayout>
    );
}
