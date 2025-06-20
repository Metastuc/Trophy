import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import { useShallow } from "zustand/shallow";

import { fetchUser } from "@/api/fetch-user";
import { sleep } from "@/lib/utils";
import { useAuthenticationStore } from "@/store/authentication";
import { logger } from "@/utils/logger";
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

    const { setIsLoading, setUser } = useAuthenticationStore(
        useShallow((state) => ({ setIsLoading: state.setIsLoading, setUser: state.setUser })),
    );

    React.useEffect(
        function () {
            if (!authenticated || !privyUser || !ready) return;

            if (lastFetchedUserIdRef.current === privyUser.id) return;
            lastFetchedUserIdRef.current = privyUser.id;

            (async function () {
                logger("AuthenticationProvider: Fetching user data from backend");

                const response = await fetchUser(privyUser.id);
                if (!response) {
                    setIsNewUser(true);

                    setFormField("bio", null);
                    setFormField("email", null);
                    setFormField("privyId", privyUser.id);
                    setFormField("profilePicture", null);
                    setFormField("username", null);

                    await sleep(2000);
                    goToFinish();
                    openDrawer();
                    return;
                }

                const backendUserData = response.data;
                logger("AuthenticationProvider: Fetched user data from backend", backendUserData);

                if (!backendUserData.isBasicProfileComplete) {
                    logger(response);

                    setIsNewUser(false);

                    setFormField("bio", backendUserData.user.bio || null);
                    setFormField("email", backendUserData.user.email || null);
                    setFormField("privyId", backendUserData.user.privyId || privyUser.id);
                    setFormField("profilePicture", backendUserData.user.profilePicture || null);
                    setFormField("username", backendUserData.user.username || null);

                    await sleep(2000);
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
