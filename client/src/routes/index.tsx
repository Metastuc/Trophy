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
            <section className="space-y-10.5 px-4">
                <header>dropdown</header>

                <footer>
                    {[...Array(10)].map((_, index) => (
                        <StreamArticle key={index} />
                    ))}
                </footer>
            </section>
        );
    },
});
