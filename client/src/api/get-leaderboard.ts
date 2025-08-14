import { queryOptions } from "@tanstack/react-query";

import { makeRequest } from "@/lib/axios";

export function getLeaderboard() {
    return queryOptions({
        queryKey: ["get-leaderboard"],
        queryFn: async function () {
            return await makeRequest<tGetLeaderboardResponse>({
                method: "GET",
                url: `/leaderboard`,
            }).then((response) => response.data);
        },
    });
}
