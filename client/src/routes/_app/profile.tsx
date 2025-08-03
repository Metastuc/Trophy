import { createFileRoute, redirect, useLoaderData } from "@tanstack/react-router";
import { TvMinimalPlay, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { toast } from "sonner";

import { getUser } from "@/api/get-user";
import { PageContentLayout } from "@/components/layouts/main-content";
import { useTabSwitcher } from "@/hooks/tab-switcher";
import { logger } from "@/utils/logger";
import { UserWallet } from "@/views/user-profile/components/wallet";

export const Route = createFileRoute("/_app/profile")({
    async beforeLoad({ context }) {
        if (!context.authenticationStore?.isAuthenticated) {
            toast.error("You must be logged in to view your profile");
            throw redirect({ to: "/" });
        }
    },

    async loader({ context }) {
        const response = await context.queryClient.ensureQueryData(
            getUser({ username: context.authenticationStore?.user?.backendUserData.user.username as string }),
        );

        if (!response) {
            throw new Error("Unable to get user profile");
        }

        logger({ response });

        return { user: response.user, streams: response.stream };
    },

    component() {
        const { user } = useLoaderData({ from: "/_app/profile" });
        const tabRefs = React.useRef<(HTMLLIElement | null)[]>([]);
        const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher<tProfileScreens>("wallet");
        const [tabIndicator, setTabIndicator] = React.useState<{ left: string; width: string }>({
            left: "0px",
            width: "0px",
        });

        return (
            <PageContentLayout className="space-y-16.5 !px-0">
                <header className="flex gap-1 px-4">
                    <aside className="flex w-15 items-center justify-center">
                        {/* <img alt="user-pfp" className="size-14 rounded-full" src={user.userPfp} /> */}
                        <img
                            alt="user-pfp"
                            className="size-14 rounded-full object-cover"
                            src="https://www.dummyimage.com/200x200/000/fff"
                        />
                    </aside>

                    <aside className="flex-1 space-y-1">
                        <h3 className="font-medium">@{user.username}</h3>

                        {user.bio ? <p className="max-h-16 min-h-8 w-48 overflow-hidden text-sm">{user.bio}</p> : null}

                        <div className="flex gap-2">
                            <span className="">
                                <b className="text-blue100 font-normal">{user.following.length}</b> Following
                            </span>
                            <span className="">
                                <b className="text-blue100 font-normal">{user.followers.length}</b> Followers
                            </span>
                        </div>
                    </aside>
                </header>

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
                                        streams
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </aside>
                    </div>
                </footer>
            </PageContentLayout>
        );
    },
});
