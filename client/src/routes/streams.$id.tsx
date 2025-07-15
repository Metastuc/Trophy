import { createFileRoute } from "@tanstack/react-router";

import { joinStream } from "@/api/join-stream";
import { PageContentLayout } from "@/components/layouts/main-content";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/streams/$id")({
    // async beforeLoad({ params, context }) {
    //     if (!context.user) return;

    //     const response = await joinStream({
    //         roomId: params.id,
    //         username: context.user.backendUserData.user.username,
    //     });

    //     if (!response) return {};

    //     console.log(response);

    //     return {};
    // },

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
