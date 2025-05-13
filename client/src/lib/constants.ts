import { base, baseSepolia } from "viem/chains";

export const ENV_SCHEMA = {
    PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID as string,
    ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
    PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT as string,
    PAYMASTER_API_KEY: process.env.NEXT_PUBLIC_PAYMASTER_API_KEY as string,
    PAYMASTER_URL: process.env.NEXT_PUBLIC_PAYMASTER_URL!
};

export const PUBLIC_ROUTES = ["/auth"];

export const network = ENV_SCHEMA.ENVIRONMENT === "development" ? baseSepolia : base;

export const REVENUE_MANAGER_ADDRESS = `0x${""}`;