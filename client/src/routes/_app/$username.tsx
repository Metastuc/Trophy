import { createFileRoute, redirect, useLoaderData } from "@tanstack/react-router";
import { TvMinimalPlay, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { getUser } from "@/api/get-user";
import { PageContentLayout } from "@/components/layouts/main-content";
import { useTabSwitcher } from "@/hooks/tab-switcher";
import { logger } from "@/utils/logger";
import { Streams } from "@/views/user-profile/components/streams";
import { UserProfileContextProvider } from "@/views/user-profile/context";

export const Route = createFileRoute("/_app/$username")({
    beforeLoad({ context, params }) {
        if (context.authenticationStore?.user?.backendUserData.user.username === params.username) {
            throw redirect({ to: "/profile" });
        }
    },

    component: () => <Page />,

    async loader({ context, params }) {
        const response = await context.queryClient.ensureQueryData(getUser({ username: params.username }));

        if (!response) {
            throw new Error("Unable to get user profile");
        }

        logger({ response });

        return { user: response.user, streams: response.streams };
    },

    params: {
        parse(data) {
            if (!data.username?.startsWith("@")) {
                throw new Error("An error occurred");
            }

            return {
                username: data.username.slice(1), // remove the '@'
            };
        },
    },
});

function Page() {
    const { user, streams } = useLoaderData({ from: "/_app/$username" });
    const { activeTab, handleTabClick } = useTabSwitcher<tProfileScreens>("holdings");

    return (
        <PageContentLayout className="space-y-16.5 !px-0">
            <UserProfileContextProvider streams={streams} user={user} isCurrentUser={false}>
                <header className="flex items-start gap-1 px-4">
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
                                        onClick={() => handleTabClick("holdings")}
                                    >
                                        <i className="size-4">
                                            <Wallet />
                                        </i>
                                        <span>Holdings</span>
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
                                {activeTab === "holdings" ? (
                                    <motion.div
                                        key="wallet"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {/* <UserWallet /> */}
                                        holdings
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
                                        <p>hello</p>
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
