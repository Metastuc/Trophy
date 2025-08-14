import { queryOptions } from "@tanstack/react-query";

import { makeRequest } from "@/lib/axios";

export function getFeed() {
    return queryOptions({
        queryKey: ["get-feed"],
        queryFn: async function () {
            return await makeRequest<tGetFeedResponse>({
                method: "GET",
                url: `/fetch-streams`,
            }).then((response) => response.data);
        },
    });
}
