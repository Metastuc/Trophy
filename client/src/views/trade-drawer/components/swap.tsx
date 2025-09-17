// import { ChangeEvent } from "react";

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { tokenInputField } from "@/utils/truncate";

// import { TOKENS } from "../constants";
// import { useTradeDrawerContext } from "../hooks";
// import { formatUSD } from "../utils";

// export function Swap() {
//     const { streamer, drawerData, isSwapped, setDrawerData, setIsSwapped } = useTradeDrawerContext();

//     function handleSellAmountChange(event: ChangeEvent<HTMLInputElement>) {
//         setDrawerData((state) => ({
//             ...state,
//             sellAmount: tokenInputField(event.target.value),
//         }));
//     }

//     console.log("Swap component rendered with data:", isSwapped);
//     console.log("Drawer data:", drawerData);

//     return (
//         <section className="mx-auto max-w-md p-4">
//             <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
//                 <aside className="flex flex-col gap-3">
//                     <input
//                         type="text"
//                         placeholder="0.00"
//                         onChange={(event) => handleSellAmountChange(event)}
//                         value={drawerData.sellAmount}
//                         className="outline-none"
//                     />
//                     <span className="text-xs text-black/60">{formatUSD(drawerData.sellAmount || "0")}</span>
//                 </aside>

//                 <aside className="flex flex-col items-center gap-2">
//                     <span>Sell</span>

//                     {!isSwapped ? (
//                         <>
//                             <Select
//                                 value={drawerData.sellToken}
//                                 onValueChange={(value) => setDrawerData((state) => ({ ...state, sellToken: value }))}
//                             >
//                                 <SelectTrigger className="border-blue100 w-25 rounded-xl p-2">
//                                     <SelectValue>
//                                         {TOKENS.find((token) => token.value === drawerData.sellToken)?.title}
//                                     </SelectValue>
//                                 </SelectTrigger>

//                                 <SelectContent>
//                                     {TOKENS.map((token, index) => (
//                                         <SelectItem key={index} value={token.value}>
//                                             {token.render}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </>
//                     ) : (
//                         <>
//                             <div className="border-blue100 flex w-25 items-center justify-center gap-1 rounded-xl border px-2 py-1.75">
//                                 <i className="size-5 overflow-hidden rounded-full">
//                                     <img src={streamer?.profilePicture} />
//                                 </i>
//                                 <span className="pt-0.5 text-xs">{streamer?.username}</span>
//                             </div>
//                         </>
//                     )}

//                     <span className="text-xs text-black/60">Balance: {drawerData.sellBalance}</span>
//                 </aside>
//             </article>

//             <div className="relative flex h-6 items-center justify-center">
//                 <i
//                     className="bg-blue100 absolute h-10 w-14 rounded-lg px-4 py-2"
//                     onClick={() => setIsSwapped(!isSwapped)}
//                 >
//                     <svg width={18} height={16} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                             d="M7 4L4 1 1 4M4 15V1M11 12l3 3 3-3M14 1v14"
//                             stroke="#FFF5F5"
//                             strokeWidth={1.5}
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>
//                 </i>
//             </div>

//             <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
//                 <aside className="flex flex-col gap-3">
//                     <input
//                         type="text"
//                         placeholder="0.00"
//                         readOnly
//                         className="outline-none"
//                         value={drawerData.buyAmount}
//                     />
//                     <span className="text-xs text-black/60">{formatUSD(drawerData.buyAmount || "0")}</span>
//                 </aside>

//                 <aside className="flex flex-col items-center gap-2">
//                     <span>Buy</span>

//                     <div className="border-blue100 flex w-25 items-center justify-center gap-1 rounded-xl border px-2 py-1.75">
//                         <i className="size-5 overflow-hidden rounded-full">
//                             <img src={streamer?.profilePicture} />
//                         </i>
//                         <span className="pt-0.5 text-xs">{streamer?.username}</span>
//                     </div>

//                     <span className="text-xs text-black/60">Balance: {drawerData.sellBalance}</span>
//                 </aside>
//             </article>
//         </section>
//     );
// }

import { useWallets } from "@privy-io/react-auth";
import { ChangeEvent, useEffect } from "react";
import { Address } from "viem";

import { useTokenPrice } from "@/api/get-token-prices";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOKEN_ADDRESSES } from "@/lib/contracts";
import { getCreatorTokenPrice, getSwapQuote } from "@/lib/flaunch";
import { getQuote, getViewerBalance } from "@/lib/token-price";
import { toLocaleString } from "@/lib/utils";
import { tokenInputField } from "@/utils/truncate";

import { TOKENS } from "../constants";
import { useTradeDrawerContext } from "../hooks";
import { formatUSD } from "../utils";

export function Swap() {
    const { streamer, drawerData, setDrawerData } = useTradeDrawerContext();
    const { wallets } = useWallets();
    const { data } = useTokenPrice(TOKEN_ADDRESSES.ETH as Address);
    console.log({data})

    useEffect(() => {
        (async () => {
            const { ethBal, tokenBal } = await getViewerBalance(streamer!.tokenAddress, wallets[0].address as Address);
            const tokenPrice = await getCreatorTokenPrice(streamer?.tokenAddress as Address);
            console.log({tokenPrice})
            if (drawerData.from.type !== "native") {
                setDrawerData((state) => ({
                    from: {
                        ...state.from,
                        balance: tokenBal,
                        usdPrice: tokenPrice
                    },
                    to: {
                        ...state.to,
                        balance: ethBal,
                        usdPrice: data!.usdPrice.toString() || "0"
                    }
                }));
            } else {
                setDrawerData((state) => ({
                    from: {
                        ...state.from,
                        balance: ethBal,
                        usdPrice: data!.usdPrice.toString() || "0"
                    },
                    to: {
                        ...state.to,
                        balance: tokenBal,
                        usdPrice: tokenPrice
                    }
                }));
            }
        })();
    }, [data, drawerData.from.type, setDrawerData, streamer, wallets]);

    async function handleFromAmountChange(event: ChangeEvent<HTMLInputElement>) {

        setDrawerData((state) => ({
            ...state,
            from: {
                ...state.from,
                amount: tokenInputField(event.target.value),
            }
        }));

        const ethToToken = drawerData.from.type === "native";

        const quote = await getSwapQuote(
            ethToToken,
            drawerData.from.amount,
            streamer?.tokenAddress as Address
        );

        setDrawerData((state) => ({
            ...state,
            to: {
                ...state.to,
                amount: toLocaleString(quote, ethToToken)
            }
        }));
    }

    function handleSwapSides() {
        setDrawerData((state) => ({ ...state, from: state.to, to: state.from }));
    }

    return (
        <section className="mx-auto max-w-md p-4">
            {/* From side */}
            <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
                <aside className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="0.00"
                        onChange={handleFromAmountChange}
                        value={drawerData.from.amount}
                        className="outline-none"
                    />
                    <span className="text-xs text-black/60">${getQuote({ quantity: drawerData.from.amount || "0", usdPrice: drawerData.from.usdPrice || "0" })}</span>
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

            {/* Swap button */}
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
