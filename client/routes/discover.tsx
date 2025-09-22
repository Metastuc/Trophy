import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getLeaderboard } from "@/api/leaderboard";

export const Route = createFileRoute("/discover")({
    component: RouteComponent,
});

function RouteComponent() {
    const { error, isPending } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => await getLeaderboard(),
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>Hello "/discover"!</div>;
}
