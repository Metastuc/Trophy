import { useWallets } from "@privy-io/react-auth";
import { ChangeEvent, useEffect } from "react";
import { useDebounceCallback, useIsMounted } from "usehooks-ts";
import { Address } from "viem";

import { useTokenPrice } from "@/api/get-token-price";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOKENS } from "@/components/ui/tokens";
import { getCreatorTokenPrice, getTokenSwapQuote } from "@/lib/flaunch";
import { formatEtherToToken, formatToken, formatUSD, getPriceInQuantity, tokenInputField } from "@/lib/utils";
import { getWalletBalance } from "@/lib/viem";
import { SUPPORTED_TOKENS } from "#~/store/supported-tokens.ts";
import { toTime } from "#~/utils/time.ts";

import { useTradeDrawerContext } from "../hooks";

export function Swap() {
    const { wallets } = useWallets();
    const { data } = useTokenPrice(SUPPORTED_TOKENS.ETH as Address);
    const isMounted = useIsMounted();

    const { streamer, drawerData, setDrawerData, swapSides } = useTradeDrawerContext();

    const debouncedSwapQuote = useDebounceCallback(
        async function (inputAmount: string) {
            if (!streamer?.tokenAddress) return;
            if (!inputAmount || Number.isNaN(+inputAmount) || +inputAmount === 0) {
                setDrawerData((state) => ({ ...state, to: { ...state.to, amount: "0" } }));
                return;
            }

            const supportedTokenToCreatorToken = drawerData.from.type === "native";
            const quote = await getTokenSwapQuote({
                amount: inputAmount,
                coinAddress: streamer?.tokenAddress as Address,
                isToCreatorToken: supportedTokenToCreatorToken,
                token: drawerData.from.token,
            });

            setDrawerData((state) => ({
                ...state,
                to: {
                    ...state.to,
                    amount: formatEtherToToken({ number: quote, toCreatorToken: supportedTokenToCreatorToken }),
                },
            }));
        },
        toTime({ unit: "seconds", value: 0.75, output: "milliseconds" }),
    );

    async function handleFromAmountChange(event: ChangeEvent<HTMLInputElement>) {
        setDrawerData((state) => ({
            ...state,
            from: { ...state.from, amount: tokenInputField(event.target.value) },
        }));

        debouncedSwapQuote(event.target.value);
    }

    useEffect(
        function () {
            let hasFetchedBalance = false;
            if (!wallets?.[0]?.address || !streamer?.tokenAddress || !drawerData.from.token) return;

            (async function () {
                const fromIsETH = drawerData.from.type === "native";
                const toIsETH = drawerData.to.type === "native";

                const [fromBalance, toBalance, tokenPrice] = await Promise.all([
                    getWalletBalance({
                        tokenAddress: streamer.tokenAddress as Address,
                        userAddress: wallets[0].address as Address,
                        isNative: fromIsETH,
                    }),

                    getWalletBalance({
                        tokenAddress: streamer.tokenAddress as Address,
                        userAddress: wallets[0].address as Address,
                        isNative: toIsETH,
                    }),

                    getCreatorTokenPrice(streamer.tokenAddress as Address),
                ]);

                if (hasFetchedBalance || !isMounted()) return;

                setDrawerData(function (state) {
                    return {
                        from: {
                            ...state.from,
                            balance: fromBalance,
                            usdPrice: fromIsETH ? (data?.usdPrice.toString() ?? "0") : tokenPrice,
                        },
                        to: {
                            ...state.to,
                            balance: toBalance,
                            usdPrice: toIsETH ? tokenPrice : (data?.usdPrice.toString() ?? "0"),
                        },
                    };
                });

                return function () {
                    hasFetchedBalance = true;
                };
            })();
        },
        [
            data?.usdPrice,
            drawerData.from.token,
            drawerData.from.type,
            drawerData.to.type,
            isMounted,
            setDrawerData,
            streamer?.tokenAddress,
            wallets,
        ],
    );

    useEffect(
        function () {
            if (!data?.usdPrice) return;
            setDrawerData((state) => ({
                ...state,
                from:
                    state.from.type === "native"
                        ? { ...state.from, usdPrice: data.usdPrice.toString() ?? "0" }
                        : state.from,
                to: state.to.type === "native" ? { ...state.to, usdPrice: data.usdPrice.toString() ?? "0" } : state.to,
            }));
        },
        [data?.usdPrice, setDrawerData],
    );

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
                            getPriceInQuantity({
                                price: data?.usdPrice?.toString() || "0",
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
                                    from: { ...state.from, token: value as TokenIdentifier },
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
                                    <SelectItem key={index} value={token.address}>
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

                    <span className="text-xs text-black/60">
                        Balance: {formatToken(drawerData.from.balance) || "0"}
                    </span>
                </aside>
            </article>

            <div className="relative flex h-6 items-center justify-center">
                <i className="bg-blue100 absolute h-10 w-14 cursor-pointer rounded-lg px-4 py-2" onClick={swapSides}>
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
                    <span className="text-xs text-black/60">
                        {formatUSD(
                            getPriceInQuantity({
                                price: data?.usdPrice?.toString() || "0",
                                quantity: drawerData.to.amount || "0",
                            }).toString(),
                        )}
                    </span>
                </aside>

                <aside className="flex flex-col items-center gap-2">
                    <span>Buy</span>

                    {drawerData.to.type === "native" ? (
                        <Select
                            value={drawerData.to.token}
                            onValueChange={(value) =>
                                setDrawerData((state) => ({
                                    ...state,
                                    to: { ...state.to, token: value as TokenIdentifier },
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
                                    <SelectItem key={index} value={token.address}>
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

                    <span className="text-xs text-black/60">Balance: {formatToken(drawerData.to.balance || "0")}</span>
                </aside>
            </article>
        </section>
    );
}
