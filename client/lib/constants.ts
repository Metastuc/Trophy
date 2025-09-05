import { QueryClient } from "@tanstack/react-query";
import { base, baseSepolia } from "viem/chains";

export const queryClient = new QueryClient();

export const ENV_SCHEMA: Record<string, string> = {
    BUNDLER_URL: import.meta.env.VITE_BUNDLER_URL as string,
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT as "development" | "production",
    PAYMASTER_URL: import.meta.env.VITE_PAYMASTER_URL as string,
    PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID as string,
    PRIVY_CLIENT_ID: import.meta.env.VITE_PRIVY_CLIENT_ID as string,
    REVENUE_MANAGER_ADDRESS: import.meta.env.VITE_REVENUE_MANAGER_ADDRESS as string,
    SERVER_URL: import.meta.env.VITE_SERVER_URL as string,
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
        GET_USER: (userId: string) => `/user/profile/${userId}`,
        UPDATE_USER: (userId: string) => `/user/${userId}`,
        ME: "/user/me",
    },

    STREAMS: {
        CREATE_STREAM: "/streams/create",
        JOIN_STREAM: (streamId: string) => `/streams/${streamId}/join`,
        LEAVE_STREAM: "/streams/leave",
    },
};

export const APPLICATION_CONSTANTS = {
    CURRENT_NETWORK: ENV_SCHEMA.ENVIRONMENT === "production" ? base : baseSepolia,
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024,
    FILE_UPLOAD_SUPPORTED_TYPES: ["image/jpeg", "image/png"],
    MAX_TIP_AMOUNT_USD: 2000,
    SUPPORTED_TOKENS: ["DEGEN", "USDC", "FLAY", "ETH", "ZORA", "BNKR"],
    TOTAL_CO_HOSTS_ALLOWED: 4,
    USERNAME_REGEX: /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,
};
