import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function joinStream({ username, roomId }: { username: string; roomId: string }): Promise<JoinStreamData> {
    return await makeRequest<JoinStreamResponse>({
        method: "POST",
        url: API_ENDPOINTS.STREAMS.JOIN_STREAM(roomId),
        data: { username },
    }).then((response) => response.data.data);
}
