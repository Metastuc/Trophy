import { createConfig } from "@privy-io/wagmi";
import { ReactNode } from "react";
import { Chain } from "viem";
import { http, WagmiProvider } from "wagmi";

import { APPLICATION_CONSTANTS } from "@/lib/constants";

const currentChain = APPLICATION_CONSTANTS.CURRENT_NETWORK as Chain;

const config = createConfig({
    chains: [currentChain],
    transports: {
        [currentChain.id]: http(),
    },
});

export function WagmiContextProvider({ children }: { children: ReactNode }) {
    return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
