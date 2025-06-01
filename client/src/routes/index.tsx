import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import HomeDropdown from "@/components/home-dropdown";
import StreamArticle from "@/components/streamer-article";
import MainContentLayout from "@/views/main-content";

export const Route = createFileRoute("/")({
    beforeLoad({ context }) {
        if (!context.authentication.isAuthenticated) {
            console.log("user is logged out");
        } else {
            console.log("user is logged in");
        }
    },

    component: function Page() {
        const [content, setContent] = React.useState<tContent>("trending");

        return (
            <MainContentLayout className="space-y-10.5">
                <HomeDropdown content={content} setContent={setContent} />

                <footer className="space-y-6.5">
                    {[...Array(10)].map((_, index) => (
                        <StreamArticle key={index} />
                    ))}
                </footer>
            </MainContentLayout>
        );
    },
});
