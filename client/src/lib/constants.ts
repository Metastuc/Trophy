import { base, baseSepolia } from "viem/chains";

export const ENV_SCHEMA = {
    PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID as string,
    ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
    PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT as string,
};

export const PUBLIC_ROUTES = ["/auth"];

export const network = ENV_SCHEMA.ENVIRONMENT === "development" ? baseSepolia : base;
