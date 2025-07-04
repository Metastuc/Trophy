import { logger } from "@/utils/logger";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/streams/$id")({
    loader: async ({ params }) => {
        logger(params.id);
        return null;
    },

    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/streams/$id"!</div>;
}
