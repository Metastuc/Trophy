import { createFileRoute } from "@tanstack/react-router";

import { PageContentLayout } from "@/components/layouts/main-content";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/streams/$id")({
    beforeLoad(ctx) {},

    async loader({ params }) {
        logger(params.id);
        return null;
    },

    component() {
        return (
            <section className="">
                <header>
                    <img src="/trophy.svg" alt="trophy-logo" />
                </header>

                <footer>
                    <PageContentLayout>hello</PageContentLayout>
                </footer>
            </section>
        );
    },
});
