import { useLoginWithEmail } from "@privy-io/react-auth";
import React from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn, sleep } from "@/lib/utils";

import {
    useAuthenticationDrawerNavigationStore,
    useAuthenticationDrawerStateStore,
} from "../store";

export function ValidateOTP() {
    const [code, setCode] = React.useState<string | null>(null);
    const hasSubmittedRef = React.useRef<boolean>(false);

    const { email, goToDefault } = useAuthenticationDrawerNavigationStore(
        useShallow((state) => ({
            email: state.email,
            goToDefault: state.goToDefault,
        })),
    );
    const closeDrawer = useAuthenticationDrawerStateStore((state) => state.closeDrawer);

    const { loginWithCode, state, sendCode } = useLoginWithEmail({
        async onComplete() {
            await sleep(1500);
            closeDrawer();

            await sleep(300);
            goToDefault();
        },

        onError(error) {
            if (error.includes("exited")) {
                goToDefault();
            } else if (error.includes("invalid_credentials")) {
                toast.error("Invalid combination of email and code.");
            }
        },
    });

    const error = state.status === "error" ? state.error?.message : null;
    const success = state.status === "done";

    function handleChange(value: string) {
        setCode(value);

        if (value.length < 6) {
            hasSubmittedRef.current = false;
        }

        if (value.length === 6 && !hasSubmittedRef.current) {
            hasSubmittedRef.current = true;
            loginWithCode({ code: value });
        }
    }

    return (
        <section>
            <div>
                <InputOTP
                    maxLength={6}
                    value={code as string}
                    onChange={(value) => handleChange(value)}
                    pattern="(?<=\b)[a-z0-9]*\d[a-z0-9]*(?=\b)"
                >
                    <InputOTPGroup className="flex w-full items-center justify-center gap-2">
                        {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                                className={cn("h-15 w-12 rounded-md border", {
                                    "border-destructive": error && code?.length === 6,
                                    "border-green-500": success && code?.length === 6,
                                })}
                                index={index}
                                key={index}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <div className="mt-4 flex items-center justify-start gap-1 text-sm">
                <p>Didn't receive an email?</p>

                <button
                    type="button"
                    onClick={() => {
                        try {
                            sendCode({ email: email as string });
                        } catch (error) {
                            console.error("Error resending OTP:", error);
                            toast.error("Error resending OTP. Please try again later.");
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
