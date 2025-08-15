import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useState } from "react";

import { getFeed } from "@/api/get-feed";
import { PageContentLayout } from "@/components/layouts/main-content";
import StreamArticle from "@/components/streamer-article";
import { Dropdown } from "@/components/ui/dropdown";

export const Route = createFileRoute("/_app/")({
    // async beforeLoad({ context }) {
    //     const { streams } = await context.queryClient.ensureQueryData(getFeed());
    //     return { liveStreams: streams.live, recordedStreams: streams.recorded };
    // },

    async loader({ context }) {
        const { streams } = await context.queryClient.ensureQueryData(getFeed());
        return {
            liveStreams: streams.live,
            recordedStreams: streams.recorded,
            dropdownButtons: [
                // { title: "Trending", value: "trending" },
                // { title: "Following", value: "following" },
                { title: "All", value: "all" },
            ] as tDROPDOWN_BUTTON[],
        };
    },

    component: () => <Page />,

    pendingComponent: () => <PageSkeleton />,
});

function Page() {
    const [content, setContent] = useState<tContent>("all");
    const { dropdownButtons, liveStreams, recordedStreams } = useLoaderData({ from: "/_app/" });

    const allStreams = [...liveStreams, ...recordedStreams];

    return (
        <PageContentLayout className="space-y-10.5">
            <Dropdown
                onChange={(value) => setContent(value as tContent)}
                options={dropdownButtons}
                icon="outlined"
                value={content}
            />

            <footer className="space-y-6.5">
                {[...allStreams].map((_, index) => (
                    <StreamArticle key={index} />
                ))}
            </footer>
        </PageContentLayout>
    );
}

function PageSkeleton() {
    return <div>loading</div>;
}
