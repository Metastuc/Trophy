import { queryOptions } from "@tanstack/react-query";

import { makeRequest } from "@/lib/axios";
import { tQueryResponse } from "@/types/profile.types";

export function getUserProfile(address: string) {
    return queryOptions({
        queryKey: ["get-user-profile", address],
        async queryFn() {
            return await makeRequest<tQueryResponse>({
                url: "/getUser",
                method: "POST",
                data: { address },
            }).then((response) => response.data);
        },
    });
}
