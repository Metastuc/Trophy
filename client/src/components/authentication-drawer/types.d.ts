type tScreen = "default" | "email" | "farcaster" | "finish" | "otp" | "wallet";

type tAuthState = {
    type: tScreen;
    screenStack: Array<tScreen>;
    email?: string;
    autheticationMethod?: LoginMethod;
};

type tAuthAction =
    | { type: "BACK" }
    | { type: "GO_TO_DEFAULT" }
    | { type: "GO_TO_EMAIL" }
    | { type: "GO_TO_FARCASTER" }
    | { type: "GO_TO_FINISH"; autheticationMethod: LoginMethod }
    | { type: "GO_TO_OTP"; email: string }
    | { type: "GO_TO_WALLET" };

interface iAuthenticationButton {
    action: tAuthAction;
    label: string;
    icon: () => React.ReactNode;
}

interface iEmailAuthState {
    code: string | null;
    email: string | null;
}

interface iEmailAuthentication {
    dispatch: React.ActionDispatch<[action: tAuthAction]>;
    sendCode: ({ email, disableSignup }: SendCodeToEmail) => Promise<void>;
}

interface iOtpAuthentication {
    email: string;
    error?: string | null;
    isSubmitting: boolean;
    onResend: () => void;
    onSubmit: (code: string) => void;
}

interface iAuthenticationDrawerContext {
    dispatch: React.ActionDispatch<[action: tAuthAction]>;
    drawerState: iDrawerState;
    setDrawerState: React.Dispatch<React.SetStateAction<iDrawerState>>;
    state: tAuthState;
}

interface iDrawerState {
    isDrawerOpen: boolean;
    isLoggingOut: boolean;
}

interface iAuthenticationProfile {
    bio: string;
    email: string;
    privyId: string;
    profileImage: string;
    username: string;
}

interface iUserProfileCompleteResponse {
    data: {
        isBasicProfileComplete: boolean;
    };
    status: string;
}
