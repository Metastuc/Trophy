import { createFileRoute } from "@tanstack/react-router";

import { PageContentLayout } from "@/components/layouts/main-content";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/streams/$id")({
    loader: async ({ params }) => {
        logger(params.id);
        return null;
    },

    component: RouteComponent,
});

function RouteComponent() {
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
}
