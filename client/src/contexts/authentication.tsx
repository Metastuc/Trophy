import { usePrivy } from "@privy-io/react-auth";
import React from "react";

import { syncUserData } from "@/api/fetch-user";
import { useAuthenticationStore } from "@/store/authentication";

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const { authenticated, ready, user: privyUser } = usePrivy();
    const setUser = useAuthenticationStore((state) => state.setUser);
    const setIsLoading = useAuthenticationStore((state) => state.setIsLoading);

    React.useEffect(
        function () {
            if (!ready) return;

            if (!authenticated || !privyUser) {
                setIsLoading(false);
                return;
            }

            (async function () {
                setIsLoading(true);

                try {
                    setUser((await syncUserData(privyUser.id)) as tAuthenticatedUser);
                } catch (error) {
                    console.error(`failed to sync user data: ${error}`);
                } finally {
                    setIsLoading(false);
                }
            })();
        },
        [authenticated, ready, privyUser],
    );

    if (!ready) return null;

    return children;
}
