import { createFileRoute } from "@tanstack/react-router";

import StreamArticle from "@/components/stream-article";

export const Route = createFileRoute("/")({
    beforeLoad({ context, location }) {
        if (!context.authentication.isAuthenticated) {
            console.log(context, location);
        }
    },

    component() {
        return (
            <section>
                {[...Array(10)].map((_, index) => (
                    <StreamArticle key={index} />
                ))}
            </section>
        );
    },
});
