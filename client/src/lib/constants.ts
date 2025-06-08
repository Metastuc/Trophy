import { base, baseSepolia } from "viem/chains";

export const ENV_SCHEMA = {
    PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID as string,
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || "development",
    PINATA_JWT: import.meta.env.VITE_PINATA_JWT as string,
    PAYMASTER_URL: `https://paymaster.biconomy.io/api/v2/84532/${import.meta.env.VITE_PAYMASTER_API_KEY!}`,
    HUDDLE_PROJECT_ID: import.meta.env.VITE_HUDDLE_PROJECT_ID as string,
};

export const PUBLIC_ROUTES = ["/auth"];

export const network = ENV_SCHEMA.ENVIRONMENT === "development" ? baseSepolia : base;

export const REVENUE_MANAGER_ADDRESS = `0x${""}`;

export const BACKEND_URL = "http://localhost:4500";
