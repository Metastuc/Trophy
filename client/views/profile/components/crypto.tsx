import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { getUserWalletTokenBalances } from "@/api/get-user";
import { Loading } from "@/components/ui/loading";
import { useAuthenticationStore } from "@/hooks/authentication";
import { formatUSD } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";

export function Crypto() {
    const openDrawer = useUserProfileDrawerStore((state) => state.openDrawer);
    const { isAuthenticated, walletAddress } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            walletAddress: state.user?.wallet?.address as Address,
        })),
    );

    const { data, error, isPending } = useQuery({
        queryKey: ["user-wallet-token-balances"],
        queryFn: async () => await getUserWalletTokenBalances({ walletAddress }),
        enabled: !!isAuthenticated,
    });

    if (error) return <div>{error.message}</div>;
    if (isPending || !data) return <Loading />;

    return data.map((value, index) => (
        <article
            key={index}
            className="flex"
            onClick={() =>
                openDrawer({
                    view: "add",
                    tab: "send",
                    payload: { token: value.symbol, tokenAddress: value.address as Address },
                })
            }
        >
            <aside className="relative size-11">
                <img src={value.icon} className="size-full" alt={`${value.symbol}-logo`} />
                <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-4" alt="base-logo" />
            </aside>

            <aside className="ml-3 flex flex-col justify-center">
                <span>{value.name}</span>
                <span className="text-blue100 text-xs uppercase">{value.symbol}</span>
            </aside>

            <aside className="ml-auto flex flex-col items-end justify-center gap-2">
                <span>{formatUSD(value.balance)}</span>
            </aside>
        </article>
    ));
}
