import { Fragment, ReactNode } from "react";

import { AuthenticationProvider } from "./authentication";
import { FarcasterMiniAppProvider } from "./farcaster";
import { HuddleContextProvider } from "./huddle";
import { PrivyContextProvider } from "./privy";
import { WagmiContextProvider } from "./wagmi";

export function AppContextProviders({ children }: { children: ReactNode }) {
    return (
        <PrivyContextProvider>
            <FarcasterMiniAppProvider>
                <WagmiContextProvider>
                    <HuddleContextProvider>
                        <AuthenticationProvider>
                            <Fragment>{children}</Fragment>
                        </AuthenticationProvider>
                    </HuddleContextProvider>
                </WagmiContextProvider>
            </FarcasterMiniAppProvider>
        </PrivyContextProvider>
    );
}
