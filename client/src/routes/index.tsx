import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    beforeLoad({ context, location }) {
        if (!context.authentication.isAuthenticated) {
            console.log(context, location);
        }
    },

    component() {
        return <div>Index</div>;
    },
});
