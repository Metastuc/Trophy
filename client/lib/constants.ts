import { QueryClient } from "@tanstack/react-query";
import { base, baseSepolia } from "viem/chains";
import { z } from "zod";

export const queryClient = new QueryClient();

export const CLIENT_ENV = z
    .object({
        VITE_ALCHEMY_RPC: z.string(),
        VITE_BUNDLER_URL: z.string(),
        VITE_DEFAULT_IMAGE: z.url(),
        VITE_ENVIRONMENT: z.enum(["development", "production", "staging"]),
        VITE_HUDDLE_PROJECT_ID: z.string(),
        VITE_HUDDLE_PROJECT_KEY: z.string(),
        VITE_PAYMASTER_URL: z.string(),
        VITE_PRIVY_APP_ID: z.string(),
        VITE_PRIVY_CLIENT_ID: z.string(),
        VITE_SERVER_URL: z.string(),
        VITE_ZERODEV_RPC: z.string(),
    })
    .parse(import.meta.env);

export const API_ENDPOINTS = {
    AUTHENTICATION: {
        ONBOARD: "/authentication/onboard",
        USER: "/authentication/user",
    },

    FEED: {
        GET_FEED: ({ page, limit }: { page: number; limit: number }) => `/streams/feed?page=${page}&limit=${limit}`,
    },

    USER: {
        GET_USER: (userId: string) => `/user/${userId}/profile`,
        GET_WALLET_TOKEN_BALANCES: (userId: string) => `/user/${userId}/wallet-token-balances`,
        ME: "/user/me",
        NOTIFICATIONS: (userId: string) => `/user/${userId}/notifications`,
        MARK_NOTIFICATIONS_AS_READ: (userId: string) => `/user/${userId}/notifications/read`,
        UPDATE_USER: (userId: string) => `/user/${userId}/update`,
    },

    STREAMS: {
        CREATE_STREAM: "/streams/create",
        END_STREAM: (streamId: string) => `/streams/${streamId}/end`,
        JOIN_STREAM: (streamId: string) => `/streams/${streamId}/join`,
        LEADERBOARD: "/streams/leaderboard",
        LEAVE_STREAM: "/streams/leave",
        THUMBNAIL: (streamId: string) => `/streams/${streamId}/thumbnail`,
    },

    SUBSCRIPTION: {
        GET_FOLLOW_STATUS: (userId: string) => `/follow/${userId}/status`,
        FOLLOW_USER: (userId: string) => `/follow/${userId}/subscribe`,
        UNFOLLOW_USER: (userId: string) => `/follow/${userId}/unsubscribe`,
    },

    TRANSACTIONS: {
        STORE_TIP: "/transactions/tip",
        STORE_TOKEN_PURCHASE: "/transactions/token/purchase",
    },

    TOKEN: {
        CLAIM_TOKENS: (userId: string) => `/token/${userId}/claim-tokens`,
        CREATE_TOKEN_URI: (userId: string) => `/token/${userId}/create-token-uri`,
        SAVE_TOKEN: (userId: string) => `/token/${userId}/save-creator-token`,
        SCHEDULE_TOKEN_CLAIMS: (userId: string) => `/token/${userId}/schedule-token-claims`,
    },

    UTIL: {
        GET_ETH_PRICE: (address: string) => `/get-eth-price?address=${address}`,
        GET_TOKEN_PRICE: (address: string) => `/get-token-price?address=${address}`,
    },
};

export const CLIENT_CONSTANTS = {
    CREATOR_TOKEN_SUPPLY: 100_000_000_000,
    CURRENT_NETWORK: CLIENT_ENV.VITE_ENVIRONMENT === "production" ? base : baseSepolia,
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024,
    FILE_UPLOAD_SUPPORTED_TYPES: ["image/jpeg", "image/png"],
    MAX_TIP_AMOUNT_USD: 10000,
    TOTAL_CO_HOSTS_ALLOWED: 4,
    USERNAME_REGEX: /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,

    TX_SCAN_URL: (hash: string) =>
        CLIENT_ENV.VITE_ENVIRONMENT === "production"
            ? `https://basescan.org/tx/${hash}`
            : `https://sepolia.basescan.org/tx/${hash}`,
};
