import { useShallow } from "zustand/shallow";

import { useAuthenticationDrawerNavigationStore } from "./store";

export function AUTHENTICATION_BUTTONS(): AuthenticateWithButton[] {
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
            icon: "/farcaster.svg",
            label: "Continue with Farcaster",
        },
        {
            handler: goToWallet,
            icon: "/wallet.svg",
            label: "Connect wallet",
        },
        {
            handler: goToEmail,
            icon: "/email.svg",
            label: "Continue with email",
        },
    ];
}
