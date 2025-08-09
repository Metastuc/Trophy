import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";

import { getStream } from "@/api/get-stream";
import { getUser } from "@/api/get-user";
import { joinStream } from "@/api/join-stream";
import { PageContentLayout } from "@/components/layouts/main-content";
import { useAuthenticationStore } from "@/store/authentication";
import { AuthenticationDrawer } from "@/views/authentication-drawer";
import { Chatroom } from "@/views/live/components/chatroom";
import { StreamContext } from "@/views/live/components/stream-context";
import { StreamScreen } from "@/views/live/components/stream-screen";
import { StreamingUIContextProvider } from "@/views/live/context";

export const Route = createFileRoute("/live/$id")({
    async beforeLoad({ context, params }) {
        const streamResponse = await getStream({ roomId: params.id });
        if (!streamResponse) {
            throw new Error("Unable to get stream");
        }

        const streamCreator = await context.queryClient.ensureQueryData(getUser({ username: streamResponse.streamer }));
        if (!streamCreator) {
            throw new Error("Unable to get stream creator");
        }

        return {
            streamResponse,
            streamCreator,
            isCreator: streamCreator.user.username === context.authenticationStore?.user?.backendUserData.user.username,
        };
    },

    async loader({ params, context }) {
        const response = await joinStream({
            roomId: params.id,
            username: context.authenticationStore?.user?.backendUserData.user.username ?? "anon",
        });

        if (!response) {
            throw new Error("Unable to join stream");
        }

        return { token: response.token, roomId: params.id };
    },

    component: () => Page(),
});

function Page() {
    const { token, roomId } = useLoaderData({ from: "/live/$id" });
    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

    return (
        <section className="flex min-h-dvh flex-col">
            <header className="flex h-11.5 items-center justify-between px-3">
                <Link to="/">
                    <img src="/trophy.svg" alt="trophy-logo" />
                </Link>

                {!isAuthenticated ? <AuthenticationDrawer /> : null}
            </header>

            <footer className="flex flex-1 flex-col">
                <StreamingUIContextProvider roomId={roomId} token={token}>
                    <StreamScreen />
                    <PageContentLayout className="flex flex-1 flex-col">
                        <StreamContext />
                        <Chatroom />
                    </PageContentLayout>
                </StreamingUIContextProvider>
            </footer>
        </section>
    );
}
