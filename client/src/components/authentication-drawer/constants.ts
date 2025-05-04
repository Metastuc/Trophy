import { EMAIL, FARCASTER, WALLET } from "@/components/icons";

export const AUTHENTICATION_BUTTONS: Array<iAuthenticationButton> = [
    {
        action: { type: "GO_TO_FARCASTER" },
        icon: FARCASTER,
        label: "Continue with farcaster",
    },
    {
        action: { type: "GO_TO_WALLET" },
        icon: WALLET,
        label: "Login with wallet",
    },
    {
        action: { type: "GO_TO_EMAIL" },
        icon: EMAIL,
        label: "Continue with email",
    },
];
