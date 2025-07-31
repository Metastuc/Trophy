import { useRoom } from "@huddle01/react";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import React from "react";

import { getStream } from "@/api/get-stream";
import { getUser } from "@/api/get-user";
import { joinStream } from "@/api/join-stream";
import { PageContentLayout } from "@/components/layouts/main-content";
import { logger } from "@/utils/logger";
import { StreamContext } from "@/views/streams/components/stream-context";
import { StreamScreen } from "@/views/streams/components/stream-screen";
import { StreamingUIContextProvider } from "@/views/streams/context";

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

        logger(streamCreator);

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
            <section className="">
                <header>
                    <img src="/trophy.svg" alt="trophy-logo" />
                </header>

                <footer>
                    <PageContentLayout>
                        <StreamingUIContextProvider>
                            <StreamScreen />
                            <StreamContext />

                            <div>chatroom</div>
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
