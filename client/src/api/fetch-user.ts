import { makeRequest } from "@/lib/axios";

interface iFetchUserResponse {
    status: string;
    data: iBackendUser;
}

export async function syncUserData(userPrivyId: string) {
    return await makeRequest<iFetchUserResponse>({
        url: "/fetch-user",
        method: "POST",
        data: { privyId: userPrivyId },
    }).then((response) => {
        return response.data;
    });
}
