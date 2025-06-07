import { logger } from "@/utils/logger";
import { useLogin, useLoginWithEmail } from "@privy-io/react-auth";

export function useOtpAuthentication(dispatch: React.ActionDispatch<[action: tAuthAction]>) {
    const {
        loginWithCode,
        sendCode,
        state: otpFlow,
    } = useLoginWithEmail({
        onComplete(params) {
            console.log("Login successful:", params);
            // dispatch({ type: "GO_TO_DEFAULT" });

            if (params.isNewUser) {
                dispatch({ type: "GO_TO_FINISH", autheticationMethod: params.loginMethod });
            } else {
                // check if user profile is completed
            }
        },

        onError(error) {
            if (error.includes("exited")) {
                dispatch({ type: "GO_TO_DEFAULT" });
            }

            // console.log({ toast: error, otpFlow });
        },
    });

    return { loginWithCode, sendCode, otpFlow };
}

interface iUseWalletAuthentication {
    dispatch: React.ActionDispatch<[action: tAuthAction]>;
    handleHasLoggedInRef: () => void;
    setDrawerState: React.Dispatch<React.SetStateAction<iDrawerState>>;
}

export function useWalletAuthentication({
    dispatch,
    handleHasLoggedInRef,
    setDrawerState,
}: iUseWalletAuthentication) {
    const { login } = useLogin({
        onComplete({ loginMethod, user }) {
            logger({ user });

            handleHasLoggedInRef();

            const userHasUsername = !!user.customMetadata?.username;
            if (!userHasUsername) {
                dispatch({ type: "GO_TO_FINISH", autheticationMethod: loginMethod });
                setDrawerState((previous) => ({ ...previous, isDrawerOpen: true }));
            } else {
                setDrawerState((previous) => ({ ...previous, isDrawerOpen: false }));
            }
        },

        onError(error) {
            if (error.includes("exited")) {
                dispatch({ type: "GO_TO_DEFAULT" });
                handleHasLoggedInRef();
            }

            setDrawerState((previous) => ({ ...previous, isDrawerOpen: true }));
        },
    });

    return { login };
}
