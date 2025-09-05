import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function authenticateUser(): Promise<AuthenticateUserResponse | void> {
    return await makeRequest<AuthenticateUserResponse>({
        method: "GET",
        url: API_ENDPOINTS.AUTHENTICATION.USER,
    })
        .then((response) => response.data)
        .catch(function (error) {
            if (error.status === 404) return;
            throw new Error((error as Error).message);
        });
}
