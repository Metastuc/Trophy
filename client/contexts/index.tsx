import { Fragment, ReactNode } from "react";

import { AuthenticationProvider } from "./authentication";
// import { CoinbaseMiniKitProvider } from "./coinbase-mini-kit";
// import { HuddleContextProvider } from "./huddle";
import { PrivyContextProvider } from "./privy";
// import { WagmiContextProvider } from "./wagmi";

export function AppContextProviders({ children }: { children: ReactNode }) {
    return (
        // <CoinbaseMiniKitProvider>
        // <HuddleContextProvider>
        <PrivyContextProvider>
            {/* <WagmiContextProvider> */}
            <AuthenticationProvider>
                <Fragment>{children}</Fragment>
            </AuthenticationProvider>
            {/* </WagmiContextProvider> */}
        </PrivyContextProvider>
        // </HuddleContextProvider>
        // </CoinbaseMiniKitProvider>
    );
}
