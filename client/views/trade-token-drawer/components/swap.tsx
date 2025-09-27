import { ChangeEvent } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTokens } from "@/components/ui/tokens";
import { formatUSD, tokenInputField, truncateText } from "@/lib/utils";

import { useTradeDrawerContext } from "../hooks";

export function Swap() {
    const { streamer, drawerData, setDrawerData } = useTradeDrawerContext();
    const TOKENS = getTokens(["ETH"]);

    function handleSellAmountChange(event: ChangeEvent<HTMLInputElement>) {
        setDrawerData((state) => ({
            ...state,
            sellAmount: tokenInputField(event.target.value),
        }));
    }

    return (
        <section className="mx-auto max-w-md p-4">
            <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
                <aside className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="0.00"
                        onChange={(event) => handleSellAmountChange(event)}
                        value={drawerData.sellAmount}
                        className="outline-none"
                    />
                    <span className="text-xs text-black/60">{formatUSD(drawerData.sellAmount || "0")}</span>
                </aside>

                <aside className="flex flex-col items-center gap-2">
                    <span>Sell</span>

                    <Select
                        value={drawerData.sellToken}
                        onValueChange={(value) => setDrawerData((state) => ({ ...state, sellToken: value }))}
                    >
                        <SelectTrigger className="border-blue100 w-25 rounded-lg p-2">
                            <SelectValue>
                                {TOKENS.find((token) => token.value === drawerData.sellToken)?.title}
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

                    <span className="text-xs text-black/60">Balance: {drawerData.sellBalance}</span>
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
                        value={drawerData.buyAmount}
                    />
                    <span className="text-xs text-black/60">{formatUSD(drawerData.buyAmount)}</span>
                </aside>

                <aside className="flex flex-col items-center gap-2">
                    <span>Buy</span>

                    <div className="border-blue100 flex w-25 items-center justify-center gap-1 rounded-xl border p-2">
                        <i className="size-5 overflow-hidden rounded-full">
                            <img src={streamer?.profilePicture} />
                        </i>
                        <span className="pt-0.5 text-xs">
                            {truncateText({ text: streamer?.username as string, maxLength: 8 })}
                        </span>
                    </div>

                    <span className="text-xs text-black/60">Balance: {drawerData.sellBalance}</span>
                </aside>
            </article>
        </section>
    );
}
