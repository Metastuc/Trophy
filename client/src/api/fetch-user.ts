import { makeRequest } from "@/lib/axios";
import { sleep } from "@/lib/utils";
import {
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "@/views/authentication-drawer/store";

interface iFetchUserResponse {
    status: string;
    data: iBackendUser;
}

const { goToFinish } = useAuthenticationDrawerNavigationStore.getState();
const { openDrawer } = useAuthenticationDrawerStateStore.getState();

export async function fetchUser(userPrivyId: string) {
    return await makeRequest<iFetchUserResponse>({
        data: { privyId: userPrivyId },
        method: "POST",
        url: "/fetch-user",
    })
        .then((response) => response.data)
        .catch(async (error) => {
            if (error.status === 404) {
                await sleep(2000);
                goToFinish();
                openDrawer();
            }
        });
}
