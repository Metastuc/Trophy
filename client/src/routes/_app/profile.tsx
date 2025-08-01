import { createFileRoute, redirect, useLoaderData } from "@tanstack/react-router";

import { getUser } from "@/api/get-user";
import { PageContentLayout } from "@/components/layouts/main-content";
import { toast } from "sonner";

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

        return { user: response.user, streams: response.stream };
    },

    component() {
        const { user } = useLoaderData({ from: "/_app/profile" });

        return (
            <PageContentLayout>
                <section className="flex gap-1">
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

                    <aside></aside>
                </section>
            </PageContentLayout>
        );
    },
});
