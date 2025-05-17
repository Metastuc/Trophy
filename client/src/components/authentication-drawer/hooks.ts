import { useLogin, useLoginWithEmail } from "@privy-io/react-auth";

export function useOtpAuthentication(dispatch: React.ActionDispatch<[action: tAuthAction]>) {
    const {
        loginWithCode,
        sendCode,
        state: otpFlow,
    } = useLoginWithEmail({
        onError(error) {
            if (error.includes("exited")) {
                dispatch({ type: "GO_TO_DEFAULT" });
            }
        },
    });

    return { loginWithCode, sendCode, otpFlow };
}

interface iUseWalletAuthentication {
    dispatch: React.ActionDispatch<[action: tAuthAction]>;
    setDrawerState: React.Dispatch<React.SetStateAction<iDrawerState>>;
}

export function useWalletAuthentication({ dispatch, setDrawerState }: iUseWalletAuthentication) {
    const { login } = useLogin({
        onComplete({ user, isNewUser }) {
            console.log("Login successful:", { user, isNewUser });
            dispatch({ type: "GO_TO_DEFAULT" });
            setDrawerState((previous) => ({ ...previous, isDrawerOpen: false }));
        },
        onError(error) {
            console.error("Wallet error:", error);

            if (error.includes("exited")) {
                dispatch({ type: "GO_TO_DEFAULT" });
            }
            setDrawerState((previous) => ({ ...previous, isDrawerOpen: true }));
        },
    });

    return { login };
}
