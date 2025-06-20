import { usePrivy } from "@privy-io/react-auth";
import React from "react";

import { fetchUser } from "@/api/fetch-user";
import { useAuthenticationStore } from "@/store/authentication";
import {
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "@/views/authentication-drawer/store";

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const { authenticated, ready, user: privyUser } = usePrivy();
    const setUser = useAuthenticationStore((state) => state.setUser);
    const setIsLoading = useAuthenticationStore((state) => state.setIsLoading);

    const navigateToFinish = useAuthenticationDrawerNavigationStore((state) => state.goToFinish);
    const openDrawer = useAuthenticationDrawerStateStore((state) => state.openDrawer);

    React.useEffect(
        function () {
            if (!ready) return;

            setIsLoading(false);

            if (!authenticated || !privyUser) return;

            (async function () {
                const response = await fetchUser(privyUser.id);
                if (response) {
                    try {
                        if (!response.data.isBasicProfileComplete) {
                            navigateToFinish();
                            openDrawer();
                        }

                        setUser({ ...privyUser, backendUserData: response.data });
                    } catch (error) {
                        console.error(`failed to sync user data: ${error}`);
                    }
                }
            })();
        },
        [authenticated, ready, privyUser, setIsLoading, setUser],
    );

    return children;
}
