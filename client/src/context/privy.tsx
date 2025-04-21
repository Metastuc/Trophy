"use client";

import { ENV_SCHEMA } from "@/lib/constants";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Provider({ children }: { children: React.ReactNode }) {
    return <PrivyProvider appId={ENV_SCHEMA.PRIVY_APP_ID}>{children}</PrivyProvider>;
}
