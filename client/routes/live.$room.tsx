import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/live/$room")({
    component: RouteComponent,
});

function RouteComponent() {
    const { room } = Route.useParams();

    return <div>Hello `/live/${room}`!</div>;
}
