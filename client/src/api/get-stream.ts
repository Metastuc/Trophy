import { makeRequest } from "@/lib/axios";

export async function getStream(data: tGetStreamRequest): Promise<void | tGetStreamResponse> {
    return makeRequest<tGetStreamResponse>({
        method: "GET",
        url: `/stream/${data.roomId}`,
    })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`Failed to get stream: ${error.message}`);
        });
}
