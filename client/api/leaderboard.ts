import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function getLeaderboard() {
    return await makeRequest({
        method: "GET",
        url: API_ENDPOINTS.STREAMS.LEADERBOARD,
    });
}
