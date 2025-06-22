import { makeRequest } from "@/lib/axios";

interface iFetchUserResponse {
    status: string;
    data: iBackendUser;
}

export async function fetchUser(): Promise<void | iFetchUserResponse> {
    return await makeRequest<iFetchUserResponse>({
        method: "POST",
        url: "/fetch-user",
    })
        .then((response) => response.data)
        .catch(async (error) => {
            if (error.status === 404) return;
            throw new Error(`Failed to fetch user: ${error.message}`);
        });
}
