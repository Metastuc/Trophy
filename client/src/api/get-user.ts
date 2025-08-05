import { queryOptions } from "@tanstack/react-query";

import { makeRequest } from "@/lib/axios";

export function getUser(data: tGetUserRequest) {
    return queryOptions({
        queryKey: ["get-user", data.username],
        queryFn: async function () {
            return await makeRequest<tGetUserResponse>({
                method: "POST",
                url: `/get-user`,
                data,
            }).then((response) => response.data);
        },
    });
}
