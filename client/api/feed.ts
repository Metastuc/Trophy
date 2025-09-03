import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function getPublicFeed(): Promise<PublicFeedResponse> {
    return await makeRequest<PublicFeedResponse>({
        method: "GET",
        url: API_ENDPOINTS.FEED.GET_FEED,
    }).then((response) => response.data);
}
