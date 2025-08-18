import { useCreateWallet, useLogin } from "@privy-io/react-auth";
import { useEffect } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { sleep } from "@/lib/utils";

import { useAuthenticationDrawerNavigationStore, useAuthenticationDrawerStateStore } from "./store";

export function usePrivyLoginTrigger() {
    const { createWallet } = useCreateWallet();

    const closeDrawer = useAuthenticationDrawerStateStore((state) => state.closeDrawer);
    const { goToDefault, screen } = useAuthenticationDrawerNavigationStore(
        useShallow((state) => ({ goToDefault: state.goToDefault, screen: state.screen })),
    );

    const { login } = useLogin({
        async onComplete({ user }) {
            if (!user?.wallet?.address) {
                toast.info("Creating wallet... Please wait.", { duration: 3000 });
                await createWallet();
            }

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

    useEffect(
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [screen],
    );
}
