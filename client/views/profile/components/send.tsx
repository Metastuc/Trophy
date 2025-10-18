import { ChangeEvent, useState } from "react";
import { Address } from "viem";

import { useTokenPrice } from "@/api/get-prices";
import { Button } from "@/components/ui/button";
import { formatUSD, tokenInputField } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";

export function UserProfileSend() {
    const payload = useUserProfileDrawerStore((state) => state.payload);
    const [recieverTabState, setRecieverTabState] = useState(() => ({
        receiver: "",
        amountInToken: "",
        amountInUsd: "",
        token: payload?.token,
        tokenAddress: payload?.tokenAddress,
    }));

    const { data: tokenPrices } = useTokenPrice(recieverTabState.tokenAddress as Address);

    function handleAmountInTokenChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = tokenInputField(event.target.value);

        setRecieverTabState((state) => ({
            ...state,
            amountInToken: inputValue,
            amountInUsd: `${tokenPrices ? Number(inputValue) * tokenPrices.usdPrice : 0}`,
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
                <h3 className="text-blue100 mt-4 text-xs">Enter amount</h3>

                <div className="border-blue100 mt-0.25 mb-2.5 flex h-25 w-full flex-col items-center justify-center rounded-xl border-2">
                    <div className="space-x-0.25 text-2xl">
                        <input
                            type="text"
                            onChange={handleAmountInTokenChange}
                            value={recieverTabState.amountInToken}
                            placeholder="0.00"
                            className="max-w-[7.5rem] focus:outline-none"
                            style={{
                                width: `${recieverTabState.amountInToken.length || 1}ch`,
                                color: recieverTabState.amountInToken ? "black" : "gray",
                            }}
                        />
                        <span> {recieverTabState.token}</span>
                    </div>
                    <span className="text-base text-gray-500">{formatUSD(recieverTabState.amountInUsd || "0")}</span>
                </div>

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

            <Button className="bg-blue100 mt-5 h-13.5 w-full">
                <span className="text-xl">Send</span>
            </Button>
        </section>
    );
}
