import Moralis from "moralis";
import { base, baseSepolia } from "viem/chains";

import { DEGEN, USDC, ZORA, BANKR } from "./contracts";

export const ENV_SCHEMA = {
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT as "development" | "production",
    HUDDLE_PROJECT_ID: import.meta.env.VITE_HUDDLE_PROJECT_ID as string,
    MORALIS_API_KEY: import.meta.env.VITE_MORALIS_API_KEY!,
    PAYMASTER_URL: `https://paymaster.biconomy.io/api/v2/84532/${import.meta.env.VITE_PAYMASTER_API_KEY!}`,
    PINATA_JWT: import.meta.env.VITE_PINATA_JWT as string,
    PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID as string,
    PRIVY_CLIENT_ID: import.meta.env.VITE_PRIVY_CLIENT_ID as string,
};

export const PUBLIC_ROUTES = ["/auth"];

const environment = ENV_SCHEMA.ENVIRONMENT;

export const network = environment === "development" ? baseSepolia : base;

export const REVENUE_MANAGER_ADDRESS = `0x${""}`;

export const BACKEND_URL = "http://localhost:4500";

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
