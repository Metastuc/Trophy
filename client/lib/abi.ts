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

export const FLAUNCH_ZAP_ABI = [
    {
        type: "function",
        name: "flaunch",
        inputs: [
            {
                name: "_flaunchParams",
                type: "tuple",
                internalType: "struct PositionManager.FlaunchParams",
                components: [
                    {
                        name: "name",
                        type: "string",
                        internalType: "string",
                    },
                    {
                        name: "symbol",
                        type: "string",
                        internalType: "string",
                    },
                    {
                        name: "tokenUri",
                        type: "string",
                        internalType: "string",
                    },
                    {
                        name: "initialTokenFairLaunch",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "fairLaunchDuration",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "premineAmount",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "creator",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "creatorFeeAllocation",
                        type: "uint24",
                        internalType: "uint24",
                    },
                    {
                        name: "flaunchAt",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "initialPriceParams",
                        type: "bytes",
                        internalType: "bytes",
                    },
                    {
                        name: "feeCalculatorParams",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
            // {
            //     name: "_trustedFeeSigner",
            //     type: "address",
            //     internalType: "address",
            // },
            {
                name: "_premineSwapHookData",
                type: "bytes",
                internalType: "bytes",
            },
            {
                name: "_whitelistParams",
                type: "tuple",
                internalType: "struct FlaunchZap.WhitelistParams",
                components: [
                    {
                        name: "merkleRoot",
                        type: "bytes32",
                        internalType: "bytes32",
                    },
                    {
                        name: "merkleIPFSHash",
                        type: "string",
                        internalType: "string",
                    },
                    {
                        name: "maxTokens",
                        type: "uint256",
                        internalType: "uint256",
                    },
                ],
            },
            {
                name: "_airdropParams",
                type: "tuple",
                internalType: "struct FlaunchZap.AirdropParams",
                components: [
                    {
                        name: "airdropIndex",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "airdropAmount",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "airdropEndTime",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "merkleRoot",
                        type: "bytes32",
                        internalType: "bytes32",
                    },
                    {
                        name: "merkleIPFSHash",
                        type: "string",
                        internalType: "string",
                    },
                ],
            },
            {
                name: "_treasuryManagerParams",
                type: "tuple",
                internalType: "struct FlaunchZap.TreasuryManagerParams",
                components: [
                    {
                        name: "manager",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "permissions",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "initializeData",
                        type: "bytes",
                        internalType: "bytes",
                    },
                    {
                        name: "depositData",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "memecoin_",
                type: "address",
                internalType: "address",
            },
            {
                name: "ethSpent_",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "deployedManager_",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "payable",
    },
];
