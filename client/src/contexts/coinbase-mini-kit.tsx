import { OnchainKitProvider } from "@coinbase/onchainkit";
import { ReactNode } from "react";
import { base } from "wagmi/chains";

import { ENV_SCHEMA } from "@/lib/constants";

export function CoinbaseMiniKitProvider({ children }: { children: ReactNode }) {
    return (
        <OnchainKitProvider
            chain={base}
            apiKey={ENV_SCHEMA.CDP_CLIENT_KEY}
            miniKit={{
                enabled: true,
            }}
        >
            {children}
        </OnchainKitProvider>
    );
}
