import { toast } from "sonner";
import { Address } from "viem";

import { useAuthenticationStore } from "#~/store/authentication.ts";
import { truncateWalletAddress } from "#~/utils/truncate.ts";

export function UserProfileReceive() {
    const walletAddress = useAuthenticationStore((state) => state.user?.wallet?.address);

    function copyAddressToClipboard() {
        if (!walletAddress) return;

        navigator.clipboard
            .writeText(walletAddress)
            .then(() => {
                toast.success("Address copied to clipboard", {
                    description: "You can now paste it in your wallet app to deposit funds.",
                });
            })
            .catch((error) => {
                toast.error("Failed to copy address to clipboard", {
                    description: error.message,
                });
            });
    }

    return (
        <section className="p-4">
            <h3 className="text-blue100 mt-4 text-center text-xs">Copy and deposit to your wallet address below</h3>

            <div className="border-blue100 mt-0.25 mb-2.5 flex h-25 w-full items-center justify-between rounded-xl border-2 px-5">
                <aside className="flex items-center gap-2">
                    <div>
                        <figure className="relative">
                            <img src="/ethereum.svg" className="size-7" alt={`ethereum-logo`} />
                            <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-3" alt="base-logo" />
                        </figure>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-light text-gray-700">Wallet address</span>
                        <span className="text-blue100 text-base">
                            {truncateWalletAddress(walletAddress as Address)}
                        </span>
                    </div>
                </aside>

                <aside>
                    <button
                        onClick={copyAddressToClipboard}
                        className="rounded-2xl bg-gradient-to-b from-[#204CE1] to-[#112A7B] px-5 py-1"
                    >
                        <span className="text-sm text-white">Copy</span>
                    </button>
                </aside>
            </div>
        </section>
    );
}
