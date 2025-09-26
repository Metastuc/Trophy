import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck } from "lucide-react";
import { Fragment, ReactNode } from "react";
import { useShallow } from "zustand/shallow";

import { getUserNotifications } from "@/api/get-user";
import { PageContentLayout } from "@/components/layout/page-content";
import { Loading } from "@/components/ui/loading";
import { useAuthenticationStore } from "@/hooks/authentication";
import { cn } from "@/lib/utils";
import { RenderNotification } from "@/views/notifications";

export const Route = createFileRoute("/notifications")({
    component: RouteComponent,
});

function RouteComponent() {
    const { isAuthenticated, profileImage, username } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            profileImage: state.user?.backendUserData.user.profilePicture as string,
            username: state.user?.backendUserData.user.username as string,
        })),
    );

    const { data, error, isPending, isSuccess, isError } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => await getUserNotifications({ username }),
        enabled: !!isAuthenticated,
        // refetchOnWindowFocus: false,
        // refetchOnMount: false,
    });

    let content: ReactNode;

    if (isPending) {
        content = <Loading />;
    } else if (isError) {
        content = <div>{error.message}</div>;
    } else if (isSuccess && data.length > 0) {
        content = (
            <ul className="space-y-5 divide-y divide-gray-200">
                {data.map((value, index) => (
                    <li key={index} className="space-y-2 pb-5">
                        <h5 className="text-xs text-gray-600">{value.label}</h5>

                        <ul className="space-y-4">
                            {value.items.map((item) => (
                                <RenderNotification key={item.id} {...item} />
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );
    } else {
        content = <div className="p-4 text-sm text-gray-500">No notifications found.</div>;
    }

    return (
        <Fragment>
            <header className="sticky top-0 z-10 flex items-center justify-between bg-white/50 backdrop-blur-[.125rem]">
                <figure
                    className="absolute h-[4.5rem] w-full"
                    style={{
                        backgroundImage: "url(/profile-bg.svg)",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                <div className="z-10 flex h-[4.5rem] w-full items-center justify-between px-6">
                    <aside className="flex items-center gap-3">
                        <i className="size-8 rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399]">
                            <img
                                className={cn("user-pfp", "rounded-full")}
                                src={profileImage}
                                alt={`${username}-pfp`}
                            />
                        </i>

                        <h2 className="text-white">Notifications</h2>
                    </aside>

                    <i className="border-blue100 text-blue100 size-6 rounded-full border p-1">
                        <CheckCheck />
                    </i>
                </div>
            </header>

            <PageContentLayout>{content}</PageContentLayout>
        </Fragment>
    );
}
