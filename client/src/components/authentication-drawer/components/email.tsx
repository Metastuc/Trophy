import React from "react";
import { toast } from "sonner";

import { EMAIL } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function Component({ dispatch, sendCode }: iEmailAuthentication) {
    const [email, setEmail] = React.useState<string | null>(null);

    async function handleEmailSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!email) return;

        try {
            await sendCode({ email });
            dispatch({ type: "GO_TO_OTP", email });
        } catch (error) {
            if (
                error instanceof Error &&
                error.message.toLowerCase().includes("invalid email address")
            ) {
                toast.error("Invalid email address");
            }
        }
    }

    return (
        <form onSubmit={handleEmailSubmit}>
            <div className="relative mb-4 w-full">
                <div
                    className={`flex w-full items-center overflow-hidden rounded-xl border ${email ? "border-blue-600 bg-blue-600" : "border-blue-100 bg-white"}`}
                >
                    <div className="p-4">
                        <i className={cn("size-5", email ? "text-white/70" : "text-black100/70")}>
                            {EMAIL()}
                        </i>
                    </div>
                    <input
                        type="email"
                        value={email || ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(event.target.value)
                        }
                        placeholder="your@email.com"
                        className={`flex-grow py-4 text-sm font-normal outline-none ${email ? "bg-blue-600 text-white placeholder-blue-300" : "bg-white"}`}
                        required
                    />
                    <button
                        type="submit"
                        className={`px-4 py-4 text-sm font-normal ${email ? "text-green-400" : "text-gray-400"}`}
                        disabled={!email}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
