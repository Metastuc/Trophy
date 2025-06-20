import { usePrivy } from "@privy-io/react-auth";
import React from "react";

import { fetchUser } from "@/api/fetch-user";
import { useAuthenticationStore } from "@/store/authentication";

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const { authenticated, ready, user: privyUser } = usePrivy();
    const setUser = useAuthenticationStore((state) => state.setUser);
    const setIsLoading = useAuthenticationStore((state) => state.setIsLoading);

    React.useEffect(
        function () {
            if (!ready) return;

            setIsLoading(false);

            if (!authenticated || !privyUser) return;

            (async function () {
                const { data: backendData } = await fetchUser(privyUser.id);

                try {
                    setUser({ ...privyUser, backendUserData: backendData });
                } catch (error) {
                    console.error(`failed to sync user data: ${error}`);
                }
            })();
        },
        [authenticated, ready, privyUser],
    );

    return children;
}
