import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { PageContentLayout } from "@/components/layouts/main-content";
import StreamArticle from "@/components/streamer-article";
import { Dropdown } from "@/components/ui/dropdown";

const DROPDOWN_BUTTONS: Array<tDROPDOWN_BUTTON> = [
    {
        title: "Trending",
        value: "trending",
    },
    {
        title: "Following",
        value: "following",
    },
    {
        title: "All",
        value: "all",
    },
];

export const Route = createFileRoute("/")({
    component: function Page() {
        const [content, setContent] = React.useState<tContent>("trending");

        return (
            <PageContentLayout className="space-y-10.5">
                <Dropdown
                    onChange={(value) => setContent(value as tContent)}
                    options={DROPDOWN_BUTTONS}
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
    },
});
