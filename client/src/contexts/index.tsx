import React from "react";

import { AuthenticationProvider } from "./authentication";
import { FarcasterMiniAppProvider } from "./farcaster";
import { HuddleContextProvider } from "./huddle";
import { PrivyContextProvider } from "./privy";

export function AppContextProviders({ children }: { children: React.ReactNode }) {
    return (
        <FarcasterMiniAppProvider>
            <HuddleContextProvider>
                <PrivyContextProvider>
                    <AuthenticationProvider>
                        <React.Fragment>{children}</React.Fragment>
                    </AuthenticationProvider>
                </PrivyContextProvider>
            </HuddleContextProvider>
        </FarcasterMiniAppProvider>
    );
}
