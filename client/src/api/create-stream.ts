import { makeRequest } from "@/lib/axios";
import { logger } from "@/utils/logger";

export async function createStream(data: tCreateStreamFormRequest): Promise<void | tCreateStreamFormResponse> {
    return makeRequest<tCreateStreamFormResponse>({
        method: "POST",
        url: "/create-stream",
        data,
    })
        .then((response) => response.data)
        .catch((error) => logger({ error }));
}
