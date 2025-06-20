import { useLogin } from "@privy-io/react-auth";
import React from "react";
import { useShallow } from "zustand/shallow";

import { sleep } from "@/lib/utils";

import { useAuthenticationDrawerNavigationStore, useAuthenticationDrawerStateStore } from "./store";

export function usePrivyLoginTrigger() {
    const closeDrawer = useAuthenticationDrawerStateStore((state) => state.closeDrawer);
    const { goToDefault, screen } = useAuthenticationDrawerNavigationStore(
        useShallow((state) => ({
            goToDefault: state.goToDefault,
            screen: state.screen,
        })),
    );

    const { login } = useLogin({
        async onComplete() {
            await sleep(1500);
            closeDrawer();

            await sleep(300);
            goToDefault();
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
        [closeDrawer, login, screen],
    );
}
