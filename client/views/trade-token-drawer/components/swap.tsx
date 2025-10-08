import { useWallets } from "@privy-io/react-auth";
import { ChangeEvent, useEffect } from "react";
import { Address } from "viem";

import { useTokenPrice } from "@/api/get-token-price";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOKENS } from "@/components/ui/tokens";
import { getCreatorTokenPrice } from "@/lib/flaunch";
import { formatUSD, getTokenPriceInUSD, tokenInputField } from "@/lib/utils";
import { getWalletBalance } from "@/lib/viem";
import { SUPPORTED_TOKENS } from "#~/store/supported-tokens.ts";

import { useTradeDrawerContext } from "../hooks";

export function Swap() {
    const { streamer, drawerData, setDrawerData } = useTradeDrawerContext();
    const { wallets } = useWallets();
    const { data } = useTokenPrice(SUPPORTED_TOKENS.ETH as Address);

    useEffect(
        function () {
            (async function () {
                const { etherBalance, tokenBalance } = await getWalletBalance({
                    tokenAddress: streamer?.tokenAddress as Address,
                    userAddress: wallets[0].address as Address,
                });
                const tokenPrice = await getCreatorTokenPrice(streamer?.tokenAddress as Address);

                if (drawerData.from.type !== "native")
                    setDrawerData((state) => ({
                        from: {
                            ...state.from,
                            balance: tokenBalance,
                            usdPrice: tokenPrice,
                        },
                        to: {
                            ...state.to,
                            balance: etherBalance,
                            usdPrice: data?.usdPrice.toString() || "0",
                        },
                    }));
                else
                    setDrawerData((state) => ({
                        from: {
                            ...state.from,
                            balance: etherBalance,
                            usdPrice: data?.usdPrice.toString() || "0",
                        },
                        to: {
                            ...state.to,
                            balance: tokenBalance,
                            usdPrice: tokenPrice,
                        },
                    }));
            })();
        },
        [data, drawerData.from.type, setDrawerData, streamer, wallets],
    );

    async function handleFromAmountChange(event: ChangeEvent<HTMLInputElement>) {
        setDrawerData((state) => ({
            ...state,
            from: {
                ...state.from,
                amount: tokenInputField(event.target.value),
            },
        }));

        // const supportedTokenToCreatorToken = drawerData.from.type === "native";

        // const quote = await getTokenSwapQuote({
        //     token: drawerData.from.token,
        //     supportedTokenToCreatorToken,
        //     amount: drawerData.from.amount,
        //     coinAddress: streamer?.tokenAddress as Address,
        // });

        // setDrawerData((state) => ({
        //     ...state,
        //     to: {
        //         ...state.to,
        //         amount: toLocaleString(quote, supportedTokenToCreatorToken),
        //     },
        // }));
    }

    function handleSwapSides() {
        setDrawerData((state) => ({ ...state, from: state.to, to: state.from }));
    }

    return (
        <section className="mx-auto max-w-md p-4">
            <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
                <aside className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="0.00"
                        onChange={handleFromAmountChange}
                        value={drawerData.from.amount}
                        className="outline-none"
                    />

                    <span className="text-xs text-black/60">
                        {formatUSD(
                            getTokenPriceInUSD({
                                price: drawerData.from.usdPrice || "0",
                                quantity: drawerData.from.amount || "0",
                            }).toString(),
                        )}
                    </span>
                </aside>

                <aside className="flex flex-col items-center gap-2">
                    <span>Sell</span>

                    {drawerData.from.type === "native" ? (
                        <Select
                            value={drawerData.from.token}
                            onValueChange={(value) =>
                                setDrawerData((state) => ({
                                    ...state,
                                    from: {
                                        ...state.from,
                                        token: value as TokenIdentifier,
                                    },
                                }))
                            }
                        >
                            <SelectTrigger className="border-blue100 w-25 rounded-xl p-2">
                                <SelectValue>
                                    {TOKENS.find((token) => token.value === drawerData.from.token)?.title}
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
                    ) : (
                        <div className="border-blue100 flex w-25 items-center justify-center gap-1 rounded-xl border px-2 py-1.75">
                            <i className="size-5 overflow-hidden rounded-full">
                                <img src={streamer?.profilePicture} />
                            </i>
                            <span className="pt-0.5 text-xs">{streamer?.username}</span>
                        </div>
                    )}

                    <span className="text-xs text-black/60">Balance: {drawerData.from.balance || "0"}</span>
                </aside>
            </article>

            <div className="relative flex h-6 items-center justify-center">
                <i
                    className="bg-blue100 absolute h-10 w-14 cursor-pointer rounded-lg px-4 py-2"
                    onClick={handleSwapSides}
                >
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

            {/* To side */}
            <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
                <aside className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="0.00"
                        readOnly
                        className="outline-none"
                        value={drawerData.to.amount}
                    />
                    {/* <span className="text-xs text-black/60">{formatUSD(drawerData.to.amount || "0")}</span> */}
                    <span className="text-xs text-black/60">{formatUSD("0")}</span>
                </aside>

                <aside className="flex flex-col items-center gap-2">
                    <span>Buy</span>

                    {drawerData.to.type === "native" ? (
                        <Select
                            value={drawerData.to.token}
                            onValueChange={(value) =>
                                setDrawerData((state) => ({
                                    ...state,
                                    to: {
                                        ...state.to,
                                        token: value as TokenIdentifier,
                                    },
                                }))
                            }
                        >
                            <SelectTrigger className="border-blue100 w-25 rounded-xl p-2">
                                <SelectValue>
                                    {TOKENS.find((token) => token.value === drawerData.to.token)?.title}
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
                    ) : (
                        <div className="border-blue100 flex w-25 items-center justify-center gap-1 rounded-xl border px-2 py-1.75">
                            <i className="size-5 overflow-hidden rounded-full">
                                <img src={streamer?.profilePicture} />
                            </i>
                            <span className="pt-0.5 text-xs">{streamer?.username}</span>
                        </div>
                    )}

                    <span className="text-xs text-black/60">Balance: {drawerData.to.balance}</span>
                </aside>
            </article>
        </section>
    );
}
