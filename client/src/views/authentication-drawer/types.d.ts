type tScreens = "default" | "email" | "farcaster" | "finish" | "otp" | "wallet";

type tAuthenticationDrawerState = {
    isOpen: boolean;

    closeDrawer: () => void;
    openDrawer: () => void;
    toggle: () => void;
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
