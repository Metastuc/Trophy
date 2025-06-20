type tScreens = "default" | "email" | "farcaster" | "finish" | "otp" | "wallet";

type tAuthenticationDrawerState = {
    isOpen: boolean;

    closeDrawer: () => void;
    openDrawer: () => void;
};

type tAuthenticationNavigationState = {
    screen: tScreens;
    screenStack: tScreens[];
    email?: string;

    back: () => void;
    goToDefault: () => void;
    goToEmail: () => void;
    goToFarcaster: () => void;
    goToFinish: () => void;
    goToOtp: (email: string) => void;
    goToWallet: () => void;
};

interface iAuthenticateWithButton {
    handler: () => void;
    icon: () => React.ReactNode;
    label: string;
}

interface iAuthenticateWithEmailFormState {
    email: string | null;
    isLoading: boolean;
    isValid: boolean;
}
