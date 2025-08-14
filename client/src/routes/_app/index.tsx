import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import React from "react";

import { getFeed } from "@/api/get-feed";
import { PageContentLayout } from "@/components/layouts/main-content";
import StreamArticle from "@/components/streamer-article";
import { Dropdown } from "@/components/ui/dropdown";

export const Route = createFileRoute("/_app/")({
    async beforeLoad({ context }) {
        const { streams } = await context.queryClient.ensureQueryData(getFeed());
        return { liveStreams: streams.live, recordedStreams: streams.recorded };
    },

    loader() {
        return {
            dropdownButtons: [
                // { title: "Trending", value: "trending" },
                // { title: "Following", value: "following" },
                { title: "All", value: "all" },
            ] as tDROPDOWN_BUTTON[],
        };
    },

    component: () => <Page />,
});

function Page() {
    const [content, setContent] = React.useState<tContent>("all");
    const { dropdownButtons } = useLoaderData({ from: "/_app/" });

    return (
        <PageContentLayout className="space-y-10.5">
            <Dropdown
                onChange={(value) => setContent(value as tContent)}
                options={dropdownButtons}
                icon="outlined"
                value={content}
            />

            <footer className="space-y-6.5">
                {[...Array(1)].map((_, index) => (
                    <StreamArticle key={index} />
                ))}
            </footer>
        </PageContentLayout>
    );
}
