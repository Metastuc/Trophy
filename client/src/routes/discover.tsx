import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/discover")({
    component() {
        return <section className="my-2 px-4">Hello "/discover"!</section>;
    },
});
