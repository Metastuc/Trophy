import { Address } from "viem";

import { TOKEN_ADDRESSES } from "@/lib/contracts";

export interface TokenConfig {
    symbol: string;
    address: Address;
    icon: string;
}

const TOKEN_CONFIG: Record<keyof typeof TOKEN_ADDRESSES, TokenConfig> = {
    ETH: {
        symbol: "ETH",
        address: TOKEN_ADDRESSES.ETH as Address,
        icon: "/ethereum.svg",
    },
    USDC: {
        symbol: "USDC",
        address: TOKEN_ADDRESSES.USDC as Address,
        icon: "/usdc.svg",
    },
    DEGEN: {
        symbol: "DEGEN",
        address: TOKEN_ADDRESSES.DEGEN as Address,
        icon: "/degen.svg",
    },
    ZORA: {
        symbol: "ZORA",
        address: TOKEN_ADDRESSES.ZORA as Address,
        icon: "/zora.svg",
    },
    BNKR: {
        symbol: "BNKR",
        address: TOKEN_ADDRESSES.BNKR as Address,
        icon: "/bankr.svg",
    },
    FLAY: {
        symbol: "FLAY",
        address: TOKEN_ADDRESSES.FLAY as Address,
        icon: "/flay.svg",
    },
};

export const TOKENS = Object.values(TOKEN_CONFIG).map((token) => ({
    address: token.address,
    render: (
        <div className="flex items-center justify-center gap-1">
            <aside className="relative">
                <img src={token.icon} className="size-3.5" alt={`${token.symbol}-logo`} />
                <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-2" alt="base-logo" />
            </aside>
            <span>{token.symbol}</span>
        </div>
    ),
    title: (
        <div className="flex items-center justify-center gap-1">
            <img src={token.icon} className="size-5" alt={`${token.symbol}-logo`} />
            <span className="pt-0.5 text-base text-white">{token.symbol}</span>
        </div>
    ),
    value: token.symbol,
}));

// export const TOKENS = [
//     {
//         address: TOKEN_ADDRESSES.ETH,
//         render: (
//             <div className="flex items-center justify-center gap-1">
//                 <aside className="relative">
//                     <img src="/etherum.svg" className="size-3.5" alt="etherum-logo" />
//                     <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-2" alt="base-logo" />
//                 </aside>
//                 <span>ETH</span>
//             </div>
//         ),
//         title: (
//             <div className="flex items-center justify-center gap-1">
//                 <img src="/etherum.svg" className="size-5" alt="etherum-logo" />
//                 <span className="pt-0.5 text-base text-white">ETH</span>
//             </div>
//         ),
//         value: "ETH",
//     },

//     {
//         address: TOKEN_ADDRESSES.USDC,
//         render: (
//             <div className="flex items-center justify-center gap-1">
//                 <aside className="relative">
//                     <img src="/usdc.svg" className="size-3.5" alt="usdc-logo" />
//                     <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-2" alt="base-logo" />
//                 </aside>
//                 <span>USDC</span>
//             </div>
//         ),
//         title: (
//             <div className="flex items-center justify-center gap-1">
//                 <img src="/usdc.svg" className="size-5" alt="usdc-logo" />
//                 <span className="pt-0.5 text-base text-white">USDC</span>
//             </div>
//         ),
//         value: "USDC",
//     },

//     {
//         address: TOKEN_ADDRESSES.ZORA,
//         render: (
//             <div className="flex items-center justify-center gap-1">
//                 <aside className="relative">
//                     <img src="/zora.svg" className="size-3.5" alt="zora-logo" />
//                     <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-2" alt="base-logo" />
//                 </aside>
//                 <span>ZORA</span>
//             </div>
//         ),
//         title: (
//             <div className="flex items-center justify-center gap-1">
//                 <img src="/zora.svg" className="size-5" alt="zora-logo" />
//                 <span className="pt-0.5 text-base text-white">ZORA</span>
//             </div>
//         ),
//         value: "ZORA",
//     },

//     {
//         address: TOKEN_ADDRESSES.DEGEN,
//         render: (
//             <div className="flex items-center justify-center gap-1">
//                 <aside className="relative">
//                     <img src="/degen.svg" className="size-3.5" alt="degen-logo" />
//                     <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-2" alt="base-logo" />
//                 </aside>
//                 <span>DEGEN</span>
//             </div>
//         ),
//         title: (
//             <div className="flex items-center justify-center gap-1">
//                 <img src="/degen.svg" className="size-5" alt="degen-logo" />
//                 <span className="pt-0.5 text-base text-white">DEGEN</span>
//             </div>
//         ),
//         value: "DEGEN",
//     },
// ];
