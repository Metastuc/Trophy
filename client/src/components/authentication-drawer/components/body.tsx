import { useAuthenticationDrawerContext } from "../context";
import { useOtpAuthentication } from "../hooks";
import { AuthenticationButtons } from "./buttons";
import { EmailAuthentication } from "./email";
import { OtpAuthentication } from "./otp";

export function AuthenticationDrawerBody() {
    const { state, dispatch } = useAuthenticationDrawerContext();
    const { loginWithCode, otpFlow, sendCode } = useOtpAuthentication(dispatch);

    switch (state.type) {
        case "default":
            return <AuthenticationButtons dispatch={dispatch} />;

        case "email":
            return <EmailAuthentication dispatch={dispatch} sendCode={sendCode} />;

        case "farcaster":
        case "otp":
            return (
                <OtpAuthentication
                    email={state.email as string}
                    isSubmitting={otpFlow.status === "submitting-code"}
                    onSubmit={(code: string) => {
                        loginWithCode({ code });
                    }}
                    onResend={() => sendCode({ email: state.email as string })}
                />
            );

        case "wallet":
            return;
    }
}
