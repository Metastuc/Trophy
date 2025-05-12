// import CountUp from "react-countup";

import { useState } from "react";

// import { truncateWalletAddress } from "@/lib/truncate";

// import { useTradeCreatorTokenContext } from "../hooks";

// export default function Component() {
//     const { token } = useTradeCreatorTokenContext();

//     return (
//         <main className="space-y-12 px-4">
//             <header className="grid grid-cols-3 place-items-center gap-5.5 max-[25rem]:grid-cols-1">
//                 <RenderMetric title="Total streams" value="21" />
//                 <RenderMetric title="Epic stream views" value="542" suffix="k" />
//                 <RenderMetric title="Troph M.Cap" value="21" suffix="M" />
//             </header>

//             <footer>
//                 <h3 className="text-blue100 text-center text-base">Top Holders of {token}</h3>

//                 <ul className="mt-5 space-y-8">
//                     {[...Array(3)].map((_, index) => (
//                         <RenderHolders
//                             key={index}
//                             address={truncateWalletAddress(
//                                 "0xC4623a82f331eD46c769Be89EBb0d920E6A5cc57",
//                             )}
//                             amount={233}
//                             shares={10.2}
//                         />
//                     ))}
//                 </ul>
//             </footer>
//         </main>
//     );
// }

// interface iMetric {
//     suffix?: string;
//     title: string;
//     value: string;
// }

// function RenderMetric({ suffix, title, value }: iMetric) {
//     return (
//         <article className="bg-blue100 flex h-13.5 w-26 flex-col items-center justify-center gap-1 rounded-[.125rem] text-center">
//             <span className="text-yellow100 text-lg leading-4.5 font-normal">
//                 <CountUp end={Number(value)} duration={1} />
//                 {suffix}
//             </span>

//             <h2 className="text-[.625rem] text-white">{title}</h2>
//         </article>
//     );
// }

// interface iHolder {
//     address: string;
//     amount: number;
//     shares: number;
// }

// function RenderHolders({ address, amount, shares }: iHolder) {
//     const { token } = useTradeCreatorTokenContext();

//     return (
//         <div className="flex items-center justify-center gap-1.5 text-xs font-light">
//             <aside>
//                 <i className="size-7">
//                     <img
//                         src="https://www.dummyimage.com/200x200/000/fff"
//                         className="rounded-full"
//                     />
//                 </i>
//             </aside>

//             <aside className="flex gap-1 pt-1">
//                 <span className="font-normal">{address}</span> holds{" "}
//                 <span className="font-normal">
//                     {amount}
//                     <b className="text-[.625rem] font-normal">K</b>{" "}
//                 </span>{" "}
//                 {token}{" "}
//                 <span className="max-[25rem]:hidden">
//                     <b className="text-green200 font-normal">{shares}%</b> of total supply
//                 </span>
//             </aside>
//         </div>
//     );
// }

export default function Component() {
    const [initialValues, setInitialValues] = useState(() => ({
        buyAmount: 0,
        sellAmount: 0,
        buyToken: "",
        sellToken: "",
        buyBalance: 0,
        sellBalance: 0,
    }));

    return <SwapComponent />;

    return <section></section>;
}

import React from "react";

const SwapComponent = () => {
    // State for amounts, selected tokens, and balances
    const [sellAmount, setSellAmount] = useState("0.00");
    const [buyAmount, setBuyAmount] = useState("0.00");
    const [sellToken, setSellToken] = useState("USDC");
    const [buyToken, setBuyToken] = useState("Jehee");
    const [sellBalance, setSellBalance] = useState(0);
    const [buyBalance, setBuyBalance] = useState(0);

    // Handle amount changes
    const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSellAmount(e.target.value);
        // Placeholder for calculating buy amount based on exchange rate
        setBuyAmount((parseFloat(e.target.value) * 1).toFixed(2)); // Simple 1:1 ratio for demo
    };

    const handleBuyAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuyAmount(e.target.value);
        // Placeholder for calculating sell amount
        setSellAmount((parseFloat(e.target.value) * 1).toFixed(2)); // Simple 1:1 ratio for demo
    };

    // Swap tokens
    const handleSwapTokens = () => {
        const tempToken = sellToken;
        const tempAmount = sellAmount;
        setSellToken(buyToken);
        setSellAmount(buyAmount);
        setBuyToken(tempToken);
        setBuyAmount(tempAmount);
    };

    // Placeholder for swap action
    const handleSwap = () => {
        console.log("Swap executed:", { sellToken, sellAmount, buyToken, buyAmount });
        // Add your swap logic here (e.g., API call)
    };

    return (
        <div className="mx-auto max-w-md p-4">
            {/* Sell Section */}
            <div className="mb-4 flex items-center justify-between rounded-lg border-2 border-blue-500 p-4">
                <div>
                    <input
                        type="number"
                        value={sellAmount}
                        onChange={handleSellAmountChange}
                        className="w-24 border-none bg-transparent text-2xl font-bold focus:outline-none"
                        placeholder="0.00"
                    />
                    <p className="text-sm text-gray-500">
                        ${(parseFloat(sellAmount) * 1).toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center">
                    <select
                        value={sellToken}
                        onChange={(e) => setSellToken(e.target.value)}
                        className="cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white"
                    >
                        <option value="USDC">USDC</option>
                        {/* Add more tokens as needed */}
                    </select>
                    <span className="ml-2 text-gray-500">Balance: {sellBalance}</span>
                </div>
            </div>

            {/* Swap Button */}
            <div className="mb-4 flex justify-center">
                <button
                    onClick={handleSwapTokens}
                    className="-translate-y-4 transform rounded-full bg-blue-500 p-2 text-white"
                >
                    ↔
                </button>
            </div>

            {/* Buy Section */}
            <div className="mb-4 flex items-center justify-between rounded-lg border-2 border-blue-500 p-4">
                <div>
                    <input
                        type="number"
                        value={buyAmount}
                        onChange={handleBuyAmountChange}
                        className="w-24 border-none bg-transparent text-2xl font-bold focus:outline-none"
                        placeholder="0.00"
                    />
                    <p className="text-sm text-gray-500">
                        ${(parseFloat(buyAmount) * 1).toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center">
                    <select
                        value={buyToken}
                        onChange={(e) => setBuyToken(e.target.value)}
                        className="cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white"
                    >
                        <option value="Jehee">Jehee</option>
                        {/* Add more tokens as needed */}
                    </select>
                    <span className="ml-2 text-gray-500">Balance: {buyBalance}</span>
                </div>
            </div>

            {/* Warning Message */}
            <p className="mb-4 text-center text-sm text-gray-500">
                ⚠ please ensure you review your trade inputs above before you swap
            </p>

            {/* Swap Action Button */}
            <button
                onClick={handleSwap}
                className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white"
            >
                Swap
            </button>
        </div>
    );
};

// export default SwapComponent;
