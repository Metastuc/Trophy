import { makeRequest } from "@/lib/axios";

interface iFetchUserResponse {
    status: string;
    data: iBackendUser;
}

export async function fetchUser(userPrivyId: string) {
    return await makeRequest<iFetchUserResponse>({
        data: { privyId: userPrivyId },
        method: "POST",
        url: "/fetch-user",
    }).then((response) => response.data);
}
