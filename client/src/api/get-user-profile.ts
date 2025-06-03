import { makeRequest } from "@/lib/axios";
import { tQueryResponse } from "@/types/profile.types";
import { queryOptions } from "@tanstack/react-query";

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
