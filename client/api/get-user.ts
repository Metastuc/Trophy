import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function getMyProfile() {
    return await makeRequest<UserProfileResponse>({ method: "GET", url: API_ENDPOINTS.USER.ME }).then(
        (response) => response.data,
    );
}

export async function getUserProfile(data: { username: string }) {
    return await makeRequest<UserProfileResponse>({
        method: "GET",
        url: API_ENDPOINTS.USER.GET_USER(data.username),
    }).then((response) => response.data);
}
