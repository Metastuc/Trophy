import { QueryClient } from "@tanstack/react-query";
import type { Address } from "viem";
import { base, baseSepolia } from "viem/chains";

import { BNKR, DEGEN, FLAY, USDC, ZORA } from "./contracts";

export const ENV_SCHEMA = {
    ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY as string,
    BUNDLER: import.meta.env.VITE_BUNDLER_URL as string,
    CDP_CLIENT_KEY: import.meta.env.VITE_CDP_CLIENT_API_KEY as string,
    COINGECKO_API_KEY: import.meta.env.VITE_COINGECKO_API_KEY as string,
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT as "development" | "production",
    FLAUNCH_CA: import.meta.env.VITE_FLAUNCH_CA as Address,
    HUDDLE_PROJECT_ID: import.meta.env.VITE_HUDDLE_PROJECT_ID as string,
    MAINNET_RPC: import.meta.env.VITE_MAINNET_RPC as string,
    MORALIS_API_KEY: import.meta.env.VITE_MORALIS_API_KEY as string,
    PAYMASTER: import.meta.env.VITE_PAYMASTER_URL as string,
    PINATA_JWT: import.meta.env.VITE_PINATA_JWT as string,
    PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID as string,
    PRIVY_CLIENT_ID: import.meta.env.VITE_PRIVY_CLIENT_ID as string,
    REVENUE_MANAGER_ADDRESS: import.meta.env.VITE_REVENUE_MANAGER as Address,
};

export const queryClient = new QueryClient();

export const PUBLIC_ROUTES = ["/auth"];

export const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum";

const environment = ENV_SCHEMA.ENVIRONMENT;

export const network = environment === "development" ? baseSepolia : base;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL!;

const addresses = {
    development: [""],
    production: [DEGEN, USDC, ZORA, BNKR, FLAY],
};

export const tokenAddresses = addresses[environment];

export const APPLICATION_CONSTANTS = {
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024,

    FILE_UPLOAD_SUPPORTED_TYPES: ["image/jpeg", "image/png"],

    MAX_TIP_AMOUNT_USD: 10000,

    SUPPORTED_TOKENS: ["DEGEN", "USDC", "FLAY", "ETH", "ZORA", "BNKR"],

    TOTAL_CO_HOSTS_ALLOWED: 4,

    USERNAME_REGEX: /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,

    CURRENT_NETWORK: ENV_SCHEMA.ENVIRONMENT === "production" ? base : baseSepolia,

    TX_SCAN_URL: (hash: string) =>
        ENV_SCHEMA.ENVIRONMENT === "production"
            ? `https://basescan.org/tx/${hash}`
            : `https://sepolia.basescan.org/tx/${hash}`,

    CURRENT_MORALIS_CHAIN: ENV_SCHEMA.ENVIRONMENT === "development" ? "base%20sepolia" : "base",
};

export const BASE_TOKEN_INFO = { tokenPrice: "0", tokenPriceInUsd: "0", balance: "0" };
