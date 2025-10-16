import { Address } from "viem";

import { Loading } from "@/components/ui/loading";
import { formatUSD } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";

export function Crypto({ data, isPending, error }: CryptoProps) {
    const openDrawer = useUserProfileDrawerStore((state) => state.openDrawer);

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
