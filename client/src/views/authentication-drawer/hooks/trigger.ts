import { useLogin } from "@privy-io/react-auth";
import React from "react";
import { useShallow } from "zustand/shallow";

import {
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "../store";

export function usePrivyLoginTrigger() {
    const { goToDefault, screen } = useAuthenticationDrawerNavigationStore(
        useShallow((state) => ({
            screen: state.screen,
            goToDefault: state.goToDefault,
        })),
    );

    const closeDrawer = useAuthenticationDrawerStateStore((state) => state.closeDrawer);

    const { login } = useLogin({
        onComplete(params) {},

        onError(error) {
            console.error("Login error:", error);
            if (error.includes("exited")) {
                closeDrawer();
                goToDefault();
            }
        },
    });

    React.useEffect(
        function () {
            if (screen === "wallet") {
                console.log("Wallet login triggered");
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
