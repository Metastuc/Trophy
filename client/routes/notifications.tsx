import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck } from "lucide-react";
import { useShallow } from "zustand/shallow";

import { useAuthenticationStore } from "@/hooks/authentication";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
    component: RouteComponent,
});

function RouteComponent() {
    const {
        isAuthenticated: _,
        profileImage,
        username,
    } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            profileImage: state.user?.backendUserData.user.profilePicture as string,
            username: state.user?.backendUserData.user.username as string,
        })),
    );

    // const { data, error, isPending } = useQuery({
    //     queryKey: ["notifications"],
    //     queryFn: async () => {},
    //     enabled: !!isAuthenticated,
    // });

    // if (error) return <div>{error.message}</div>;

    return (
        <section>
            <header className="relative flex items-center justify-between">
                <figure
                    className="absolute h-[4.5rem] w-full"
                    style={{
                        backgroundImage: "url(/profile-bg.svg)",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                <div className="z-10 flex h-[4.5rem] w-full items-center justify-between px-6">
                    <aside className="flex items-center gap-0.5">
                        <i className="size-8 rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399]">
                            <img
                                className={cn("user-pfp", "rounded-full")}
                                src={profileImage}
                                alt={`${username}-pfp`}
                            />
                        </i>

                        <h2 className="">Notifications</h2>
                    </aside>

                    <i className="border-blue100 text-blue100 size-6 rounded-full border p-1">
                        <CheckCheck />
                    </i>
                </div>
            </header>

            <main></main>
            <footer></footer>
        </section>
    );
}
