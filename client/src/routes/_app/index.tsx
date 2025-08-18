import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { getFeed } from "@/api/get-feed";
import { PageContentLayout } from "@/components/layouts/main-content";
import { Dropdown } from "@/components/ui/dropdown";
import { StreamArticle } from "@/views/feed/components/article";

export const Route = createFileRoute("/_app/")({
    component: () => <Page />,
});

function Page() {
    const dropdownButtons = [
        // { title: "Trending", value: "trending" },
        // { title: "Following", value: "following" },
        { title: "All", value: "all" },
    ] as tDROPDOWN_BUTTON[];

    const [content, setContent] = useState<tContent>("all");

    const { data, error } = useQuery(getFeed());

    if (error) {
        return <>error</>;
    }

    const allStreams = [...(data?.streams.live ?? []), ...(data?.streams.recorded ?? [])];

    return (
        <PageContentLayout className="space-y-10.5">
            <Dropdown
                onChange={(value) => setContent(value as tContent)}
                options={dropdownButtons}
                icon="outlined"
                value={content}
            />
            <section className="space-y-6.5">
                {[...allStreams].map((value, index) => (
                    <StreamArticle key={index} {...value} />
                ))}
            </section>
        </PageContentLayout>
    );
}
