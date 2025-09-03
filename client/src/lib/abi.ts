export declare const MORPH_ABI: readonly [
    {
        name: "deposit";
        inputs: [{ name: "assets"; type: "uint256" }, { name: "receiver"; type: "address" }];
        stateMutability: "nonpayable";
        type: "function";
        outputs: [];
    },
];

export declare const QUOTE_ABI: readonly [
    {
        name: "quoteExactInputSingle";
        type: "function";
        stateMutability: "view";
        inputs: [
            { name: "tokenIn"; type: "address" },
            { name: "tokenOut"; type: "address" },
            { name: "fee"; type: "uint24" },
            { name: "amountIn"; type: "uint256" },
            { name: "sqrtPriceLimitX96"; type: "uint160" },
        ];
        outputs: [{ name: "amountOut"; type: "uint256" }];
    },
];
