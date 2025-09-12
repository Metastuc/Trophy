import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function getFollowStatus(username: string): Promise<FollowStatusData> {
    return await makeRequest<FollowStatusResponse>({
        method: "GET",
        url: API_ENDPOINTS.SUBSCRIPTION.GET_FOLLOW_STATUS(username),
    }).then((response) => response.data.data);
}
