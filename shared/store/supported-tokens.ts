import { Address } from "viem";

export const CONTRACT_ADDRESSES: Record<string, Address> = {
    BANKR: "0x22af33fe49fd1fa80c7149773dde5890d3c76f3b",
    BASE_V2_QUOTER: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
    BASE_V3_ROUTER: "0x2626664c2603336E57B271c5C0b26F421741e481",
    BASE_WETH: "0x4200000000000000000000000000000000000006",
    DEGEN: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
    FLAUNCH: "0xe52dE1801C10cF709cc8e62d43D783AFe984b510",
    FLAY: "0xf1a7000000950c7ad8aff13118bb7ab561a448ee",
    MORPHO_RE7_POOL: "0xA2Cac0023a4797b4729Db94783405189a4203AFc",
    NEXUS_IMPLN: "0x000000004F43C49e93C970E84001853a70923B03",
    PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    REVENUE_MANAGER: "0xb1648d65326876781E90Fe1fB0282B1558834AB2",
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    ZORA: "0x1111111111166b7fe7bd91427724b487980afc69",
};

export const SUPPORTED_TOKENS = {
    BANKR: CONTRACT_ADDRESSES.BANKR,
    DEGEN: CONTRACT_ADDRESSES.DEGEN,
    ETH: CONTRACT_ADDRESSES.BASE_WETH,
    FLAY: CONTRACT_ADDRESSES.FLAY,
    USDC: CONTRACT_ADDRESSES.USDC,
    ZORA: CONTRACT_ADDRESSES.ZORA,
};

interface TokenConfig {
    address: Address;
    icon: string;
    name: string;
    symbol: string;
}

export const TOKEN_CONFIG: Record<keyof typeof SUPPORTED_TOKENS, TokenConfig> = {
    ETH: {
        address: SUPPORTED_TOKENS.ETH,
        icon: "/ethereum.svg",
        name: "Ethereum",
        symbol: "ETH",
    },

    USDC: {
        address: SUPPORTED_TOKENS.USDC,
        icon: "/usdc.svg",
        name: "USD Coin",
        symbol: "USDC",
    },

    DEGEN: {
        address: SUPPORTED_TOKENS.DEGEN,
        icon: "/degen.svg",
        name: "Degen",
        symbol: "DEGEN",
    },

    ZORA: {
        address: SUPPORTED_TOKENS.ZORA,
        icon: "/zora.svg",
        name: "Zora",
        symbol: "ZORA",
    },

    BANKR: {
        address: SUPPORTED_TOKENS.BANKR,
        icon: "/bankr.svg",
        name: "BankrCoin",
        symbol: "BNKR",
    },

    FLAY: {
        address: SUPPORTED_TOKENS.FLAY,
        icon: "/flay.svg",
        name: "Flayer",
        symbol: "FLAY",
    },
};
