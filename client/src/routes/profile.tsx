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
                <section className="flex gap-1">
                    <aside className="flex w-15 items-center justify-center">
                        {status === "pending" ? (
                            <Skeleton className="size-14 rounded-full" />
                        ) : (
                            <img
                                alt="user-pfp"
                                className="size-14 rounded-full"
                                src={userData?.uploadedPfp}
                            />
                        )}
                    </aside>

                    <aside className="flex-1 space-y-1">
                        <h3>
                            {status !== "pending" ? (
                                <Skeleton className="h-4 w-1/4" />
                            ) : (
                                <span className="font-medium">@{userData?.username}</span>
                            )}
                        </h3>

                        {status === "pending" ? (
                            <Skeleton className="h-8 w-1/2" />
                        ) : (
                            <p className="max-h-16 min-h-8 w-48 overflow-hidden text-sm">
                                {/* {userData?.bio} */}
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
                                modi vel, asperiores commodi blanditiis suscipit fugiat saepe error.
                                Non, natus! Cupiditate, temporibus quaerat! Ullam ea perferendis
                                velit, blanditiis nam possimus tempora, neque ipsam sint nesciunt
                                error molestiae? Soluta aperiam tenetur nulla eos dolorem deserunt
                                nesciunt maxime, architecto unde perspiciatis maiores!
                            </p>
                        )}
                    </aside>
                </section>
            </MainContentLayout>
        );
    },
});
