import { QueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { base, baseSepolia } from "viem/chains";
import { z } from "zod";

import { toTime } from "#~/utils/time.ts";

export const queryClient = new QueryClient();

export const CLIENT_ENV = z
    .object({
        VITE_BUNDLER_URL: z.string(),
        VITE_ENVIRONMENT: z.enum(["development", "production", "staging"]),
        VITE_HUDDLE_PROJECT_ID: z.string(),
        VITE_HUDDLE_PROJECT_KEY: z.string(),
        VITE_PAYMASTER_URL: z.string(),
        VITE_PRIVY_APP_ID: z.string(),
        VITE_PRIVY_CLIENT_ID: z.string(),
        VITE_SERVER_URL: z.string(),
    })
    .parse(import.meta.env);

export const CONTRACT_ADDRESSES: Record<string, Address> = {
    BANKR: "0x22af33fe49fd1fa80c7149773dde5890d3c76f3b",
    BASE_V2_QUOTER: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
    BASE_V3_ROUTER: "0x2626664c2603336E57B271c5C0b26F421741e481",
    BASE_WETH: "0x4200000000000000000000000000000000000006",
    DEGEN: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
    FLAUNCH: "0x312706b6599bb406cb21a91c3314ec7883b014a1",
    FLAY: "0xf1a7000000950c7ad8aff13118bb7ab561a448ee",
    MORPHO_RE7_POOL: "0xA2Cac0023a4797b4729Db94783405189a4203AFc",
    NEXUS_IMPLN: "0x000000004F43C49e93C970E84001853a70923B03",
    PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    REVENUE_MANAGER: "0xb1648d65326876781E90Fe1fB0282B1558834AB2",
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    ZORA: "0x1111111111166b7fe7bd91427724b487980afc69",
};

export const API_ENDPOINTS = {
    AUTHENTICATION: {
        ONBOARD: "/authentication/onboard",
        USER: "/authentication/user",
    },

    FEED: {
        GET_FEED: "/streams/feed",
    },

    USER: {
        GET_USER: (userId: string) => `/user/${userId}/profile`,
        ME: "/user/me",
        SAVE_TOKEN: (userId: string) => `/user/${userId}/save-creator-token`,
        UPDATE_USER: (userId: string) => `/user/${userId}`,
    },

    STREAMS: {
        CREATE_STREAM: "/streams/create",
        END_STREAM: (streamId: string) => `/streams/${streamId}/end`,
        JOIN_STREAM: (streamId: string) => `/streams/${streamId}/join`,
        LEAVE_STREAM: "/streams/leave",
        THUMBNAIL: "/streams/thumbnail",
    },

    SUBSCRIPTION: {
        GET_FOLLOW_STATUS: (userId: string) => `/follow/${userId}/status`,
        FOLLOW_USER: (userId: string) => `/follow/${userId}/subscribe`,
        UNFOLLOW_USER: (userId: string) => `/follow/${userId}/unsubscribe`,
    },

    TIPS: {
        STORE_TIP: "/tips/store",
    },

    UTIL: {
        GET_TOKEN_PRICE: (address: string) => `/get-token-price?address=${address}`,
    },
};

export const CLIENT_CONSTANTS = {
    CURRENT_NETWORK: CLIENT_ENV.VITE_ENVIRONMENT === "production" ? base : baseSepolia,
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024,
    FILE_UPLOAD_SUPPORTED_TYPES: ["image/jpeg", "image/png"],
    MAX_TIP_AMOUNT_USD: 10000,
    TOTAL_CO_HOSTS_ALLOWED: 4,
    USERNAME_REGEX: /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,

    QUERY_KEYS: {
        PRICE: {
            KEY: "moralis-token-price",
            TTL: toTime({ unit: "hours", value: 1, output: "milliseconds" }),
        },
    },

    SUPPORTED_TOKENS: {
        BANKR: CONTRACT_ADDRESSES.BANKR,
        DEGEN: CONTRACT_ADDRESSES.DEGEN,
        ETH: CONTRACT_ADDRESSES.BASE_WETH,
        FLAY: CONTRACT_ADDRESSES.FLAY,
        USDC: CONTRACT_ADDRESSES.USDC,
        ZORA: CONTRACT_ADDRESSES.ZORA,
    },

    TX_SCAN_URL: (hash: string) =>
        CLIENT_ENV.VITE_ENVIRONMENT === "production"
            ? `https://basescan.org/tx/${hash}`
            : `https://sepolia.basescan.org/tx/${hash}`,
};

export const TOKEN_CONFIG: Record<keyof typeof CLIENT_CONSTANTS.SUPPORTED_TOKENS, TokenDropdownConfig> = {
    ETH: {
        address: CLIENT_CONSTANTS.SUPPORTED_TOKENS.ETH,
        icon: "/ethereum.svg",
        symbol: "ETH",
    },
    USDC: {
        address: CLIENT_CONSTANTS.SUPPORTED_TOKENS.USDC,
        icon: "/usdc.svg",
        symbol: "USDC",
    },
    DEGEN: {
        address: CLIENT_CONSTANTS.SUPPORTED_TOKENS.DEGEN,
        icon: "/degen.svg",
        symbol: "DEGEN",
    },
    ZORA: {
        address: CLIENT_CONSTANTS.SUPPORTED_TOKENS.ZORA,
        icon: "/zora.svg",
        symbol: "ZORA",
    },
    BANKR: {
        address: CLIENT_CONSTANTS.SUPPORTED_TOKENS.BANKR,
        icon: "/bankr.svg",
        symbol: "BNKR",
    },
    FLAY: {
        address: CLIENT_CONSTANTS.SUPPORTED_TOKENS.FLAY,
        icon: "/flay.svg",
        symbol: "FLAY",
    },
};
