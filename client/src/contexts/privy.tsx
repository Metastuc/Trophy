import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";

import { ENV_SCHEMA } from "@/lib/constants";

export function PrivyContextProvider({ children }: { children: React.ReactNode }) {
    return <PrivyProvider appId={ENV_SCHEMA.PRIVY_APP_ID}>{children}</PrivyProvider>;
}
