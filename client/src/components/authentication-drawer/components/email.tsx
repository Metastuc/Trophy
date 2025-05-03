import { EMAIL } from "@/components/icons";
import { cn } from "@/lib/utils";

import React from "react";

export default function Component() {
    const [email, setEmail] = React.useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        // Add your authentication logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative w-full mb-4">
                <div
                    className={`flex items-center w-full overflow-hidden rounded-xl border ${email ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"}`}
                >
                    <div className="p-4">
                        <i className={cn("size-5", email ? "text-white/70" : "text-black100/70")}>
                            {EMAIL()}
                        </i>
                    </div>
                    <input
                        type="email"
                        value={email as string}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`flex-grow py-4 outline-none ${email ? "bg-blue-600 text-white placeholder-blue-300" : "bg-white"}`}
                        required
                    />
                    <button
                        type="submit"
                        className={`px-4 py-4 font-medium ${email ? "text-green-400" : "text-gray-400"}`}
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* <div className="text-center text-sm text-gray-500 mt-6">
                    By logging in I agree to the{" "}
                    <Link href="#" className="text-gray-700 font-medium">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-gray-700 font-medium">
                        Privacy policy
                    </Link>
                </div> */}

            {/* <div className="text-center text-sm font-medium mt-6">
                    Protected by <span className="font-bold">privy</span>
                </div> */}
        </form>
    );
}
