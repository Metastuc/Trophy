import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import { getStream } from "@/api/get-stream";
import { getUser } from "@/api/get-user";
import { joinStream } from "@/api/join-stream";
import { PageContentLayout } from "@/components/layouts/main-content";
import { logger } from "@/utils/logger";
import { StreamContext } from "@/views/streams/components/stream-context";
import { useRoom } from "@huddle01/react";

export const Route = createFileRoute("/streams/$id")({
    async beforeLoad({ context, params }) {
        const streamResponse = await getStream({ roomId: params.id });
        if (!streamResponse) {
            throw new Error("Unable to get stream");
        }

        const streamCreator = await context.queryClient.ensureQueryData(
            getUser({ username: streamResponse.streamer }),
        );
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

        return response;
    },

    component() {
        const { token } = useLoaderData({ from: "/streams/$id" });

        const {} = useRoom({
            onFailed(data) {},
            onJoin(data) {},
            onLeave(data) {},
            onPeerJoin(data) {},
            onPeerLeft(data) {},
            onWaiting(data) {},
        });

        return (
            <section className="">
                <header>
                    <img src="/trophy.svg" alt="trophy-logo" />
                </header>

                <footer>
                    <PageContentLayout>
                        <div>Stream</div>
                        <StreamContext />
                    </PageContentLayout>
                </footer>
            </section>
        );
    },

    pendingComponent() {
        return <>loading...</>;
    },
});
