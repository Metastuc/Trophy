import { makeRequest } from "@/lib/axios";

export async function endStream(data: tEndStreamRequest) {
    return makeRequest({ method: "POST", url: "/stop-stream", data })
        .then((response) => response.data)
        .catch(async (error) => {
            throw new Error(`Failed to end stream: ${error.message}`);
        });
}
