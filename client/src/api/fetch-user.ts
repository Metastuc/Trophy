import { makeRequest } from "@/lib/axios";

export async function syncUserData(userId: string) {
    return await makeRequest<Partial<tAuthenticatedUser>>({
        url: "/fetch-user",
        method: "POST",
        data: { privyId: userId },
    }).then((response) => response.data);
}
