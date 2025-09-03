import { API_ENDPOINTS } from "@/lib/constants";
import { AuthenticateUserResponse } from "#~/schema/user.ts";
import { makeRequest } from "#~/utils/axios.ts";

export async function authenticateUser(): Promise<ApiResponse<AuthenticateUserResponse> | void> {
    return await makeRequest<ApiResponse<AuthenticateUserResponse>>({
        method: "POST",
        url: API_ENDPOINTS.AUTHENTICATION.USER,
    })
        .then((response) => response.data)
        .catch(async (error) => {
            if (error.status === 404) return;
            throw new Error(error.message);
        });
}
