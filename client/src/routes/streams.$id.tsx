import { useRoom } from "@huddle01/react";
import { createFileRoute } from "@tanstack/react-router";

import { PageContentLayout } from "@/components/layouts/main-content";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/streams/$id")({
    loader: async ({ params }) => {
        logger(params.id);
        return null;
    },

    component: function () {
        const { joinRoom } = useRoom();

        return (
            <section className="">
                <header>
                    <img src="/trophy.svg" alt="trophy-logo" />
                </header>

                <footer>
                    <PageContentLayout></PageContentLayout>
                </footer>
            </section>
        );
    },
});
