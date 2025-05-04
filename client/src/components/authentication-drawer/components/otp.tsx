import { EMAIL } from "@/components/icons";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import React from "react";

export default function Component({ email, isSubmitting, onSubmit }: iOtpScreen) {
    const [code, setCode] = React.useState<string | null>(null);
    const hasSubmittedRef = React.useRef<boolean>(false);

    React.useEffect(() => {
        if (code?.length === 6 && !hasSubmittedRef.current && !isSubmitting) {
            hasSubmittedRef.current = true;
            onSubmit(code);
        }
    }, [code, isSubmitting, onSubmit]);
    return (
        <section>
            <div className="flex flex-col items-center">
                <i className="text-black size-10">{EMAIL()}</i>
                <p className="text-center font-light text-black200">
                    Please check <span className="font-normal text-black100">{email}</span> for an
                    email from privy.io and enter your code below.
                </p>
            </div>

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
                <p>Didn't receive an email?</p> <button type="button">Resend code</button>
            </div>
        </section>
    );
}
