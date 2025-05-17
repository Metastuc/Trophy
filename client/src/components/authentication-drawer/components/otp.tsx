import React from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function OtpAuthentication({ email, isSubmitting, onResend, onSubmit }: iOtpAuthentication) {
    const [code, setCode] = React.useState<string | null>(null);
    const hasSubmittedRef = React.useRef<boolean>(false);

    React.useEffect(() => {
        if (code?.length === 6 && !hasSubmittedRef.current && !isSubmitting) {
            hasSubmittedRef.current = true;
            onSubmit(code);
        }
    }, [code, isSubmitting, email, onSubmit]);
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
                                className="h-15 w-12 rounded-md border"
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
                    onClick={() => {
                        try {
                            onResend();
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
