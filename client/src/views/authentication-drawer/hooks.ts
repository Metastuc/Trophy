import { useLogin } from "@privy-io/react-auth";
import React from "react";
import { useShallow } from "zustand/shallow";

import { fetchUser } from "@/api/fetch-user";

import { useAuthenticationDrawerNavigationStore, useAuthenticationDrawerStateStore } from "./store";

export function usePrivyLoginTrigger() {
    const { goToDefault, goToFinish, screen } = useAuthenticationDrawerNavigationStore(
        useShallow((state) => ({
            goToDefault: state.goToDefault,
            goToFinish: state.goToFinish,
            screen: state.screen,
        })),
    );

    const { closeDrawer, openDrawer } = useAuthenticationDrawerStateStore(
        useShallow((state) => ({
            closeDrawer: state.closeDrawer,
            openDrawer: state.openDrawer,
        })),
    );

    const { login } = useLogin({
        async onComplete(params) {
            const { data } = await fetchUser(params.user.id);

            if (data.isBasicProfileComplete) {
                goToDefault();
            } else {
                openDrawer();
                goToFinish();
            }
        },

        onError(error) {
            if (error.includes("exited")) {
                closeDrawer();
                goToDefault();
            }
        },
    });

    React.useEffect(
        function () {
            if (screen === "wallet") {
                closeDrawer();
                login({ loginMethods: ["wallet"], walletChainType: "ethereum-only" });
            }

            if (screen === "farcaster") {
                closeDrawer();
                login({ loginMethods: ["farcaster"] });
            }
        },
        [screen],
    );
}
