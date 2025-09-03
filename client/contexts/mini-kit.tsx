import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { ReactNode } from "react";
import { base } from "viem/chains";

import { ENV_SCHEMA } from "@/lib/constants";

export function CoinbaseMiniKitProvider({ children }: { children: ReactNode }) {
    return (
        <MiniKitProvider chain={base} apiKey={ENV_SCHEMA.CDP_CLIENT_KEY}>
            {children}
        </MiniKitProvider>
    );
}
