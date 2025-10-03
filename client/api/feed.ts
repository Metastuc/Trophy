import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function getPublicFeed({ page, limit }: { page: number; limit: number }): Promise<PublicFeedData> {
    return await makeRequest<PublicFeedResponse>({
        method: "GET",
        url: API_ENDPOINTS.FEED.GET_FEED({ page, limit }),
    }).then((response) => response.data.data);
}
