import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import React from "react";
import { useShallow } from "zustand/shallow";

import { fetchUser } from "@/api/fetch-user";
import { sleep } from "@/lib/utils";
import { useAuthenticationStore } from "@/store/authentication";
import {
    useAuthenticationDrawerFormStore,
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "@/views/authentication-drawer/store";

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const { authenticated, ready, user: privyUser } = usePrivy();
    const lastFetchedUserIdRef = React.useRef<string | null>(null);

    const goToFinish = useAuthenticationDrawerNavigationStore((state) => state.goToFinish);
    const openDrawer = useAuthenticationDrawerStateStore((state) => state.openDrawer);

    const { setIsNewUser, setFormField } = useAuthenticationDrawerFormStore(
        useShallow((state) => ({ setIsNewUser: state.setIsNewUser, setFormField: state.setField })),
    );

    const { setIsLoading, setToken, setUser } = useAuthenticationStore(
        useShallow((state) => ({
            setIsLoading: state.setIsLoading,
            setToken: state.setToken,
            setUser: state.setUser,
        })),
    );

    React.useEffect(
        function () {
            if (!authenticated || !privyUser || !ready) return;

            if (lastFetchedUserIdRef.current === privyUser.id) return;
            lastFetchedUserIdRef.current = privyUser.id;

            (async function () {
                const accessToken = await getAccessToken();
                setToken(accessToken as string);

                const response = await fetchUser();
                if (!response) {
                    setIsNewUser(true);

                    setFormField("bio", privyUser.farcaster?.bio || null);
                    setFormField("privyId", privyUser.id || null);
                    setFormField("profilePicture", privyUser.farcaster?.pfp || null);
                    setFormField("username", privyUser.farcaster?.username || null);

                    await sleep(3000);
                    goToFinish();
                    openDrawer();
                    return;
                }

                const backendUserData = response.data;

                if (!backendUserData.isBasicProfileComplete) {
                    setIsNewUser(false);

                    setFormField("bio", backendUserData.user.bio || null);
                    setFormField("email", backendUserData.user.email || null);
                    setFormField("profilePicture", backendUserData.user.profilePicture || null);
                    setFormField("username", backendUserData.user.username || null);

                    await sleep(3000);
                    goToFinish();
                    openDrawer();
                }

                setUser({ ...privyUser, backendUserData: response.data });
            })();
        },
        [authenticated, ready, privyUser, setIsLoading, setUser],
    );

    return children;
}
