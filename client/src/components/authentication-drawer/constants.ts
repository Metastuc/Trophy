import { EMAIL, FARCASTER, WALLET } from "@/components/icons";

export const AUTHENTICATION_BUTTONS: Array<iAuthenticationButton> = [
    {
        action: {
            type: "SELECT_FARCASTER",
        },
        icon: FARCASTER,
        label: "Continue with farcaster",
    },
    {
        action: {
            type: "SELECT_WALLET",
        },
        icon: WALLET,
        label: "Login with wallet",
    },
    {
        action: {
            type: "SELECT_EMAIL",
        },
        icon: EMAIL,
        label: "Continue with email",
    },
];
