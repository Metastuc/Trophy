type tScreen = "default" | "email" | "farcaster" | "otp" | "wallet";

type tAuthState = {
    type: tScreen;
    screenStack: Array<tScreen>;
    email?: string;
};

type tAuthAction =
    | { type: "BACK" }
    | { type: "GO_TO_DEFAULT" }
    | { type: "GO_TO_EMAIL" }
    | { type: "GO_TO_FARCASTER" }
    | { type: "GO_TO_OTP"; email: string }
    | { type: "GO_TO_WALLET" };

interface iAuthenticationButton {
    action: tAuthAction;
    label: string;
    icon: () => React.ReactNode;
}

type tEmailState =
    | { status: "error"; message: string }
    | { status: "input"; email: string }
    | { status: "otp"; email: string; code: string }
    | { status: "sending"; email: string }
    | { status: "submitting"; email: string; code: string }
    | { status: "success"; email: string };

type tEmailAction =
    | { type: "CODE_SENT" }
    | { type: "ERROR"; payload: string }
    | { type: "LOGIN_SUCCESS" }
    | { type: "RESET" }
    | { type: "SET_CODE"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SUBMIT_CODE" }
    | { type: "SUBMIT_EMAIL" };

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
    isSubmitting: boolean;
    onResend: () => void;
    onSubmit: (code: string) => void;
}

interface iAuthenticationDrawerContext {
    dispatch: React.ActionDispatch<[action: tAuthAction]>;
    drawerState: iDrawerState;
    hasLoggedInRef: React.RefObject<boolean>;
    setDrawerState: React.Dispatch<React.SetStateAction<iDrawerState>>;
    state: tAuthState;
}

interface iDrawerState {
    isDrawerOpen: boolean;
    isLoggingOut: boolean;
}
