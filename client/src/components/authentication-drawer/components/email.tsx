import { EMAIL } from "@/components/icons";
import { cn } from "@/lib/utils";

import React from "react";

export default function Component({ dispatch, sendCode }: iEmailAuthentication) {
    const [email, setEmail] = React.useState<string | null>(null);

    async function handleEmailSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!email) return;

        try {
            await sendCode({ email });
            dispatch({ type: "GO_TO_OTP", email });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleEmailSubmit}>
            <div className="relative w-full mb-4">
                <div
                    className={`flex items-center w-full overflow-hidden rounded-xl border ${email ? "bg-blue-600 border-blue-600" : "bg-white border-blue-100"}`}
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
                        className={`flex-grow py-4 outline-none font-normal text-sm ${email ? "bg-blue-600 text-white placeholder-blue-300" : "bg-white"}`}
                        required
                    />
                    <button
                        type="submit"
                        className={`px-4 py-4 font-normal text-sm ${email ? "text-green-400" : "text-gray-400"}`}
                        disabled={!email}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
