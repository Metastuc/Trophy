import { useLoginWithEmail } from "@privy-io/react-auth";
import React from "react";
import { toast } from "sonner";

import { EMAIL } from "@/assets/icons";
import { cn } from "@/lib/utils";

import { Loader } from "lucide-react";
import { useAuthenticationDrawerNavigationStore } from "../store";

export function AuthenticateWithEmail() {
    const { sendCode } = useLoginWithEmail();
    const navigateToOtp = useAuthenticationDrawerNavigationStore((state) => state.goToOtp);

    const [formState, setFormState] = React.useState<iAuthenticateWithEmailFormState>(() => ({
        email: null,
        isLoading: false,
        isValid: false,
    }));

    function validateEmail(email: string): boolean {
        const regex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return regex.test(email);
    }

    React.useEffect(
        function () {
            setFormState((previous) => ({
                ...previous,
                isValid: validateEmail(formState.email || ""),
            }));
        },
        [formState.email],
    );

    async function handleEmailSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!formState.isValid) return;
        setFormState((previous) => ({ ...previous, isLoading: true }));

        try {
            await sendCode({ email: formState.email as string });
            navigateToOtp(formState.email as string);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message.toLowerCase().includes("invalid email address")
            ) {
                toast.error("Invalid email address");
            }
        } finally {
            setFormState((previous) => ({ ...previous, isLoading: false }));
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
                            "size-5 transition-colors",
                            formState.email ? "text-white/70" : "text-black100/70",
                        )}
                    >
                        {EMAIL()}
                    </i>
                </div>

                <input
                    type="email"
                    value={formState.email || ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setFormState((previous) => ({ ...previous, email: event.target.value }))
                    }
                    placeholder="your@email.com"
                    className={cn(
                        "flex-grow py-4 text-sm font-normal outline-none",
                        formState.email
                            ? "bg-blue-600 text-white placeholder-blue-300"
                            : "bg-white",
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
