import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useShallow } from "zustand/shallow";

import { joinStream } from "@/api/join-stream";
import { cn } from "@/lib/utils";
import { LiveStreamContextProvider } from "@/views/live/context";
import { generateGuestId } from "@/views/live/utils";
import { useAuthenticationStore } from "#~/store/authentication.ts";

export const Route = createFileRoute("/live/$room")({
    component: RouteComponent,
});

function RouteComponent() {
    const { room: roomId } = Route.useParams();
    const { isAuthenticated, username } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            username: state.user?.backendUserData.user.username,
        })),
    );

    const roomUsername = isAuthenticated ? username : generateGuestId();
    const { data, error, isPending } = useQuery({
        queryKey: ["join-stream", roomId, roomUsername],
        queryFn: async () => await joinStream({ username: roomUsername as string, roomId }),
        refetchOnWindowFocus: false,
    });

    if (isPending) return <div>Joining...</div>;
    if (error) return <div>Error joining stream: {error.message}</div>;
    if (!data) return <div>No data available for this stream.</div>;

    console.log("Stream data:", data);

    return (
        <section className={cn("shell", "flex flex-col")}>
            <LiveStreamContextProvider roomId={roomId}></LiveStreamContextProvider>
        </section>
    );
}
