import { useRoom } from "@huddle01/react";
import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import React from "react";

import { getStream } from "@/api/get-stream";
import { getUser } from "@/api/get-user";
import { joinStream } from "@/api/join-stream";
import { PageContentLayout } from "@/components/layouts/main-content";
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

        return { streamResponse, streamCreator };
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

    component() {
        const { token, roomId } = useLoaderData({ from: "/live/$id" });

        const { joinRoom, state } = useRoom({
            onFailed(data) {},
            onJoin(data) {
                console.log("Joined room successfully", data);
            },
            onLeave(data) {},
            onPeerJoin(data) {
                console.log("Peer joined", data);
            },
            onPeerLeft(data) {},
            onWaiting(data) {},
        });

        console.log({ state });

        React.useEffect(
            function () {
                (async function () {
                    if (state === "idle") {
                        await joinRoom({ roomId, token });
                    }
                })();
            },
            [roomId, token],
        );

        return (
            <section className="flex min-h-screen flex-col">
                <header className="flex h-11.5 items-center justify-start px-3">
                    <Link to="/">
                        <img src="/trophy.svg" alt="trophy-logo" />
                    </Link>
                </header>

                <footer className="flex flex-1">
                    <PageContentLayout className="flex flex-1 flex-col">
                        <StreamingUIContextProvider>
                            <StreamScreen />
                            <StreamContext />
                            <Chatroom />
                        </StreamingUIContextProvider>
                    </PageContentLayout>
                </footer>
            </section>
        );
    },

    pendingComponent() {
        return <>loading...</>;
    },
});
