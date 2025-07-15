import { makeRequest } from "@/lib/axios";
import { logger } from "@/utils/logger";

export async function joinStream(data: tJoinStreamRequest): Promise<void | tJoinStreamResponse> {
    return makeRequest<tJoinStreamResponse>({
        method: "POST",
        url: "/join-stream",
        data,
    })
        .then((response) => response.data)
        .catch((error) => logger({ error }));
}
