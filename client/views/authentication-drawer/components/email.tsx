import { useLoginWithEmail } from "@privy-io/react-auth";
import { Loader } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useAuthenticationDrawerNavigationStore } from "../store";

export function AuthenticateWithEmail() {
    const { sendCode } = useLoginWithEmail();
    const navigateToOtp = useAuthenticationDrawerNavigationStore((state) => state.goToOtp);

    const [formState, setFormState] = useState<AuthenticateWithEmailFormState>(() => ({
        email: null,
        isLoading: false,
        isValid: false,
    }));

    function validateEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    useEffect(
        function () {
            setFormState((state) => ({
                ...state,
                isValid: validateEmail(formState.email || ""),
            }));
        },
        [formState.email],
    );

    async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!formState.isValid) return;
        setFormState((state) => ({ ...state, isLoading: true }));

        try {
            await sendCode({ email: formState.email as string });
            navigateToOtp(formState.email as string);
        } catch (error) {
            if (error instanceof Error && error.message.toLowerCase().includes("invalid email address")) {
                toast.error("Invalid email address");
            }
        } finally {
            setFormState((state) => ({ ...state, isLoading: false }));
        }
    }

    return (
        <form
            onSubmit={handleEmailSubmit}
            className={cn(
                "relative mb-4 w-full transition-all duration-150 ease-in-out",
                formState.isLoading && "cursor-not-allowed opacity-50",
            )}
        >
            <section
                className={cn(
                    "flex w-full items-center overflow-hidden rounded-xl border transition-colors [&>*]:transition-colors",
                    formState.email ? "border-blue-600 bg-blue-600" : "border-blue-100 bg-white",
                )}
            >
                <div className="p-4">
                    <i
                        className={cn(
                            "size-6 transition-colors",
                            formState.email ? "text-white/70" : "text-black100/70",
                        )}
                    >
                        <span
                            className="flex size-full items-center justify-center bg-current"
                            style={{
                                maskImage: "url(/email.svg)",
                                WebkitMaskImage: "url(/email.svg)",
                                maskRepeat: "no-repeat",
                                WebkitMaskRepeat: "no-repeat",
                                maskPosition: "center",
                                WebkitMaskPosition: "center",
                                maskSize: "contain",
                                WebkitMaskSize: "contain",
                            }}
                        />
                    </i>
                </div>

                <input
                    type="email"
                    value={formState.email || ""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setFormState((state) => ({ ...state, email: event.target.value }))
                    }
                    placeholder="your@email.com"
                    className={cn(
                        "flex-grow py-4 text-sm font-normal outline-none",
                        formState.email ? "bg-blue-600 text-white placeholder-blue-300" : "bg-white",
                    )}
                    disabled={formState.isLoading}
                    required
                />

                <button
                    type="submit"
                    className={cn(
                        "px-4 py-4 text-sm font-normal",
                        formState.isValid ? "text-green-400" : "text-gray-400",
                        formState.isLoading ? "cursor-not-allowed" : "cursor-pointer",
                    )}
                    disabled={!formState.isValid || formState.isLoading}
                >
                    {formState.isLoading ? (
                        <Loader className="size-5 animate-spin text-white/70" />
                    ) : (
                        <span>Submit</span>
                    )}
                </button>
            </section>
        </form>
    );
}
