import { queryOptions } from "@tanstack/react-query";

import { makeRequest } from "@/lib/axios";
import { tQueryResponse } from "@/types/profile";

export function getUserProfile(address: string) {
    return queryOptions({
        queryKey: ["get-user-profile", address],
        async queryFn() {
            return await makeRequest<tQueryResponse>({
                url: "/get-profile",
                method: "GET",
                data: { address },
            }).then((response) => response.data);
        },
    });
}
