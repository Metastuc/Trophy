import { useShallow } from "zustand/shallow";

import { EMAIL, FARCASTER, WALLET } from "@/assets/icons";

import { useAuthenticationDrawerNavigationStore } from "./store";

export function AUTHENTICATION_BUTTONS(): iAuthenticateWithButton[] {
    const { goToEmail, goToFarcaster, goToWallet } = useAuthenticationDrawerNavigationStore(
        useShallow((state) => ({
            goToEmail: state.goToEmail,
            goToFarcaster: state.goToFarcaster,
            goToWallet: state.goToWallet,
        })),
    );

    return [
        {
            handler: goToFarcaster,
            icon: FARCASTER,
            label: "Continue with Farcaster",
        },
        {
            handler: goToWallet,
            icon: WALLET,
            label: "Connect wallet",
        },
        {
            handler: goToEmail,
            icon: EMAIL,
            label: "Continue with email",
        },
    ];
}
