import { Fragment, ReactNode } from "react";

import { AuthenticationProvider } from "./authentication";
import { FarcasterMiniAppProvider } from "./farcaster";
// import { HuddleContextProvider } from "./huddle";
import { PrivyContextProvider } from "./privy";
import { WagmiContextProvider } from "./wagmi";

export function AppContextProviders({ children }: { children: ReactNode }) {
    {
        /* <HuddleContextProvider> */
    }
    return (
        <PrivyContextProvider>
            <FarcasterMiniAppProvider>
                <WagmiContextProvider>
                    <AuthenticationProvider>
                        <Fragment>{children}</Fragment>
                    </AuthenticationProvider>
                </WagmiContextProvider>
            </FarcasterMiniAppProvider>
        </PrivyContextProvider>
    );
    {
        /* </HuddleContextProvider> */
    }
}
