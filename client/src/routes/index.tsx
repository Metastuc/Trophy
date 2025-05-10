import { createFileRoute } from "@tanstack/react-router";

import HomeDropdown from "@/components/home-dropdown";
import StreamArticle from "@/components/streamer-article";
import { AnimatePresence } from "motion/react";
import React from "react";

export const Route = createFileRoute("/")({
    beforeLoad({ context, location }) {
        if (!context.authentication.isAuthenticated) {
            console.log(context, location);
        }
    },

    component() {
        const [content, setContent] = React.useState<tContent>("trending");

        return (
            <section className="space-y-10.5 px-4">
                <AnimatePresence>
                    <HomeDropdown content={content} setContent={setContent} />
                </AnimatePresence>

                <footer className="space-y-6.5">
                    {[...Array(10)].map((_, index) => (
                        <StreamArticle key={index} />
                    ))}
                </footer>
            </section>
        );
    },
});
