import { createFileRoute, redirect, useRouteContext } from "@tanstack/react-router";

import { getUserProfile } from "@/api/get-user-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { logger } from "@/utils/logger";
import MainContentLayout from "@/views/main-content";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/profile")({
    async beforeLoad({ context }) {
        if (!context.authentication.isReady) return;
        if (!context.authentication.isAuthenticated) {
            throw redirect({ to: "/" });
        }
    },
    component: function Page() {
        const { authentication } = useRouteContext({ from: "/profile" });
        logger({ authentication });

        // const { status, data } = useQuery(
        //     getUserProfile(authentication.user?.wallet?.address as string),
        // );
        const { status, data } = useQuery(
            getUserProfile("0x2AE67a159fc288dB6bA4407C014F20147130b54a"),
        );
        const userData = data?.data;
        logger({ userData });

        return (
            <MainContentLayout>
                <section className="flex">
                    <aside className="flex w-15 items-center justify-center border border-black">
                        {status === "pending" ? (
                            <Skeleton className="size-14 rounded-full" />
                        ) : (
                            <img
                                alt="user-pfp"
                                className="size-14 rounded-full"
                                src={userData?.pfp}
                            />
                        )}
                    </aside>

                    <aside className="flex-1">
                        <h3>
                            {status === "pending" ? (
                                <Skeleton className="size-4" />
                            ) : (
                                <span>@{userData?.username}</span>
                            )}
                        </h3>
                    </aside>
                </section>
            </MainContentLayout>
        );
    },
});
