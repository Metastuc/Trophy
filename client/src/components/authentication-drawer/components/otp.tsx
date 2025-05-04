import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { useLoginWithEmail } from "@privy-io/react-auth";
import React from "react";

export default function Component({ email, isSubmitting }: iOtpScreen) {
    const [code, setCode] = React.useState<string | null>(null);
    const hasSubmittedRef = React.useRef<boolean>(false);

    const { loginWithCode, sendCode } = useLoginWithEmail({
        onComplete({ user, isNewUser }) {
            console.log("Login successful:", { user, isNewUser });
        },
        onError(error) {
            console.error("Login error:", error);
        },
    });

    React.useEffect(() => {
        if (code?.length === 6 && !hasSubmittedRef.current && !isSubmitting) {
            hasSubmittedRef.current = true;
            // loginWithCode({ code });
        }
    }, [code, isSubmitting, email, loginWithCode]);
    return (
        <section>
            <div className="">
                <InputOTP
                    maxLength={6}
                    value={code as string}
                    onChange={(value) => {
                        setCode(value);
                        if (value.length < 6) {
                            hasSubmittedRef.current = false;
                        }
                    }}
                    pattern="(?<=\b)[a-z0-9]*\d[a-z0-9]*(?=\b)"
                >
                    <InputOTPGroup className="flex w-full items-center justify-center gap-2">
                        {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                                className="border h-15 w-12 rounded-md"
                                index={index}
                                key={index}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <div className="flex items-center justify-center gap-1">
                <p>Didn't receive an email?</p>{" "}
                <button
                    type="button"
                    onClick={async function () {
                        try {
                            // await sendCode({ email });
                            console.log("OTP resent successfully");
                        } catch (error) {
                            console.error("Error resending OTP:", error);
                        }
                    }}
                >
                    Resend code
                </button>
            </div>
        </section>
    );
}
