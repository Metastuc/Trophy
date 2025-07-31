import { EIP1193Provider, useWallets } from "@privy-io/react-auth";
import React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { TOKENS } from "../constants";
import { formatUSD } from "../utils";

export function Swap() {
    const [initialValues, setInitialValues] = React.useState(() => ({
        buyAmount: 0,
        sellAmount: 0,

        buyToken: "",
        sellToken: "USDC",

        buyBalance: 0,
        sellBalance: 0,
    }));

    const [provider, setProvider] = React.useState<EIP1193Provider | null>(null);

    const { wallets } = useWallets();

    const wallet = wallets[0];

    React.useEffect(() => {
        if (!wallet) {
            return;
        }
        (async () => setProvider(await wallet.getEthereumProvider()))();
    }, [wallet, provider]);

    function handleSellAmountChange() {}

    function handleBuyAmountChange() {}

    function handleSwap() {}

    return (
        <section className="mx-auto max-w-md p-4">
            <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
                <aside className="flex flex-col gap-3">
                    <input type="text" placeholder="0.00" />
                    <span className="text-xs text-black/60">{formatUSD(initialValues.sellAmount)}</span>
                </aside>

                <aside className="flex flex-col items-center gap-2">
                    <span>Sell</span>

                    <Select
                        value={initialValues.sellToken}
                        onValueChange={(value) => setInitialValues((previous) => ({ ...previous, sellToken: value }))}
                    >
                        <SelectTrigger className="border-blue100 w-25 rounded-xl p-2">
                            <SelectValue>
                                {TOKENS.find((token) => token.value === initialValues.sellToken)?.title}
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                            {TOKENS.map((token, index) => (
                                <SelectItem key={index} value={token.value}>
                                    {token.render}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <span className="text-xs text-black/60">Balance: {initialValues.sellBalance}</span>
                </aside>
            </article>

            <div className="relative flex h-6 items-center justify-center">
                <i className="bg-blue100 absolute h-10 w-14 rounded-lg px-4 py-2">
                    <svg width={18} height={16} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 4L4 1 1 4M4 15V1M11 12l3 3 3-3M14 1v14"
                            stroke="#FFF5F5"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </i>
            </div>

            <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
                <aside className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="0.00"
                        readOnly
                        className="outline-none"
                        value={initialValues.buyAmount}
                    />
                    <span className="text-xs text-black/60">{formatUSD(initialValues.buyAmount)}</span>
                </aside>

                <aside className="flex flex-col items-center gap-2">
                    <span>Buy</span>

                    <div className="border-blue100 flex w-25 items-center justify-center gap-1 rounded-xl border p-2">
                        <i className="size-3.5 overflow-hidden rounded-full">ICON</i>
                        <span className="pt-0.5 text-xs">TOKEN</span>
                    </div>

                    <span className="text-xs text-black/60">Balance: {initialValues.sellBalance}</span>
                </aside>
            </article>
        </section>
    );
}
