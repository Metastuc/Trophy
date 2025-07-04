import { createFileRoute } from "@tanstack/react-router";

import { PageContentLayout } from "@/components/layouts/main-content";

export const Route = createFileRoute("/profile")({
    component: function Page() {
        return (
            <PageContentLayout>
                <section className="flex gap-1">
                    {/* <aside className="flex w-15 items-center justify-center">
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
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
                                modi vel, asperiores commodi blanditiis suscipit fugiat saepe error.
                                Non, natus! Cupiditate, temporibus quaerat! Ullam ea perferendis
                                velit, blanditiis nam possimus tempora, neque ipsam sint nesciunt
                                error molestiae? Soluta aperiam tenetur nulla eos dolorem deserunt
                                nesciunt maxime, architecto unde perspiciatis maiores!
                            </p>
                        )}
                    </aside> */}
                </section>
            </PageContentLayout>
        );
    },
});
