import { makeRequest } from "@/lib/axios";

export async function joinStream(data: tJoinStreamRequest): Promise<void | tJoinStreamResponse> {
    return makeRequest<tJoinStreamResponse>({
        method: "POST",
        url: "/join-stream",
        data,
    })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`Failed to join stream: ${error.message}`);
        });
}
