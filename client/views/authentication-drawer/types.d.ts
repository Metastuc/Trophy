type AuthenticationDrawerScreens = "default" | "email" | "farcaster" | "finish" | "otp" | "wallet";

type AuthenticationDrawerState = {
    isOpen: boolean;

    closeDrawer: () => void;
    openDrawer: () => void;
};

type AuthenticationNavigationState = {
    screen: AuthenticationDrawerScreens;
    screenStack: AuthenticationDrawerScreens[];
    email?: string;

    back: () => void;
    goToDefault: () => void;
    goToEmail: () => void;
    goToFarcaster: () => void;
    goToFinish: () => void;
    goToOtp: (email: string) => void;
    goToWallet: () => void;
};

type AuthenticationDrawerFormState = AuthenticationDrawerFormData & {
    resetForm: () => void;
    setField: <K extends keyof AuthenticationDrawerFormState>(key: K, value: AuthenticationDrawerFormState[K]) => void;
    setIsNewUser: (isNewUser: boolean) => void;
};

interface AuthenticateWithButton {
    handler: () => void;
    icon: string;
    label: string;
}

interface AuthenticateWithEmailFormState {
    email: string | null;
    isLoading: boolean;
    isValid: boolean;
}

interface AuthenticationDrawerFormData {
    [key: string]: unknown;

    bio?: string | null;
    email?: string | null;
    fc?: boolean | null;
    isNewUser?: boolean;
    profilePicture?: File | string | null;
    username?: string | null;
    walletAddress?: string | null;
}
