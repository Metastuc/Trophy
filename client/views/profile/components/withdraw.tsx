import { ChangeEvent, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOKENS } from "@/components/ui/tokens";
import { formatUSD } from "@/lib/utils";
import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";

export function Withdraw() {
    const [recieverTabState, setRecieverTabState] = useState(() => ({
        receiver: "",
        amountInToken: "",
        amountInUsd: "",
        token: TOKENS[0].value,
        tokenAddress: TOKENS[0].address,
    }));

    // const { data: tokenPrices } = useTokenPrice(recieverTabState.tokenAddress as Address);

    function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
        setRecieverTabState((state) => ({
            ...state,
            amountInToken: event.target.value,
            // amountInUsd: formatUSD(`${tokenPrices ? Number(event.target.value) * tokenPrices.usdPrice : 0}`),
        }));
    }

    function handleTipPercentage(value: string) {
        console.log(value);
    }

    return (
        <section className="p-4">
            <div>
                <input
                    type="text"
                    value={recieverTabState.receiver}
                    onChange={(event) => setRecieverTabState((state) => ({ ...state, receiver: event.target.value }))}
                    placeholder="Enter a username or Base address"
                    className="bg-blue100 w-full rounded-lg p-2 text-sm font-light text-white/70 placeholder:text-white/50"
                />
            </div>

            <section className="flex flex-col items-center justify-center">
                <aside className="mt-8.5 mb-2.5 w-full">
                    <span className="text-blue100 pl-5 text-xs">Enter amount</span>

                    <div className="border-blue100 flex h-25 items-center justify-between rounded-xl border-2 p-4">
                        <aside className="flex flex-col items-start justify-center">
                            <div className="flex items-center justify-center gap-1 text-2xl">
                                <input
                                    value={recieverTabState.amountInToken}
                                    onChange={handleAmountChange}
                                    style={{
                                        width: `${recieverTabState.amountInToken.length || 1}ch`,
                                        color: recieverTabState.amountInToken ? "black" : "gray",
                                    }}
                                    className="max-w-[7.5rem] outline-none"
                                    placeholder="0.00"
                                />
                                <span>{recieverTabState.token}</span>
                            </div>

                            <span className="text-base text-[#060606]/50">
                                {formatUSD(recieverTabState.amountInUsd || "0")}
                            </span>
                        </aside>

                        <aside className="flex flex-col items-center justify-center">
                            <Select
                                value={recieverTabState.token}
                                onValueChange={(value) =>
                                    setRecieverTabState((state) => ({
                                        ...state,
                                        token: value,
                                        tokenAddress: TOKEN_CONFIG[value as keyof typeof TOKEN_CONFIG].address,
                                    }))
                                }
                            >
                                <SelectTrigger className="border-blue100 h-10.5! min-w-28 rounded-lg bg-[#1B1B1B] p-0 px-2">
                                    <SelectValue>
                                        {TOKENS.find((token) => token.value === recieverTabState.token)?.title}
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

                            <span className="text-blue100 mt-1 mr-auto text-xs">Balance: 0.00</span>
                        </aside>
                    </div>
                </aside>

                <div className="flex items-center justify-center gap-4">
                    {["10%", "25%", "50%", "100%"].map((value, index) => (
                        <button
                            key={index}
                            onClick={() => handleTipPercentage(value)}
                            className="border-blue100 rounded-xs border px-4 py-1 text-sm font-light"
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </section>
        </section>
    );
}
