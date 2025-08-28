import Moralis from "moralis";
import type { Address } from "viem";
import { base, baseSepolia } from "viem/chains";

import { BANKR, DEGEN, USDC, ZORA } from "./contracts";

export const ENV_SCHEMA = {
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT as "development" | "production",
    HUDDLE_PROJECT_ID: import.meta.env.VITE_HUDDLE_PROJECT_ID as string,
    MORALIS_API_KEY: import.meta.env.VITE_MORALIS_API_KEY as string,
    PAYMASTER: import.meta.env.VITE_PAYMASTER_URL as string,
    PINATA_JWT: import.meta.env.VITE_PINATA_JWT as string,
    PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID as string,
    PRIVY_CLIENT_ID: import.meta.env.VITE_PRIVY_CLIENT_ID as string,
    CDP_CLIENT_KEY: import.meta.env.VITE_CDP_CLIENT_API_KEY as string,
    BUNDLER: import.meta.env.VITE_BUNDLER_URL as string,
    REVENUE_MANAGER_ADDRESS: import.meta.env.VITE_REVENUE_MANAGER as Address,
    FLAUNCH_CA: import.meta.env.VITE_FLAUNCH_CA as Address,
    COINGECKO_API_KEY: import.meta.env.VITE_COINGECKO_API_KEY as string,
};

export const PUBLIC_ROUTES = ["/auth"];

export const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum"

const environment = ENV_SCHEMA.ENVIRONMENT;

export const network = environment === "development" ? baseSepolia : base;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL!;

export const moralisChain =
    environment === "development" ? Moralis.EvmUtils.EvmChain.BASE_SEPOLIA : Moralis.EvmUtils.EvmChain.BASE;

const addresses = {
    development: [""],
    production: [DEGEN, USDC, ZORA, BANKR],
};

export const tokenAddresses = addresses[environment];

export const APPLICATION_CONSTANTS = {
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024,
    FILE_UPLOAD_SUPPORTED_TYPES: ["image/jpeg", "image/png"],

    TOTAL_CO_HOSTS_ALLOWED: 4,

    USERNAME_REGEX: /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,
};
