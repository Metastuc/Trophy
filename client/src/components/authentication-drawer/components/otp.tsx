import React from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

export function OtpAuthentication({
    email,
    error,
    isSubmitting,
    onResend,
    onSubmit,
}: iOtpAuthentication) {
    const [code, setCode] = React.useState<string | null>(null);
    const hasSubmittedRef = React.useRef<boolean>(false);

    console.log({ error });

    React.useEffect(() => {
        if (code?.length === 6 && !hasSubmittedRef.current && !isSubmitting) {
            hasSubmittedRef.current = true;
            onSubmit(code);
        }
    }, [code, isSubmitting, email, onSubmit]);
    return (
        <section>
            <div>
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
                                className={cn("h-15 w-12 rounded-md border", {
                                    "border-destructive": error && code?.length === 6,
                                })}
                                index={index}
                                key={index}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <div className="mt-2 flex items-center justify-start gap-1 text-sm">
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
                    <span className="underline">Resend code</span>
                </button>
            </div>

            <p className="mt-2 text-center text-xs font-light">
                By loggin in, you agree to our <span className="font-normal underline">Terms</span>{" "}
                and <span className="font-normal underline">Privacy Policy</span>
            </p>
        </section>
    );
}
