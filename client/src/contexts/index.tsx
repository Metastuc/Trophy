import { Fragment, ReactNode } from "react";

import { AuthenticationProvider } from "./authentication";
import { CoinbaseMiniKitProvider } from "./coinbase-mini-kit";
import { HuddleContextProvider } from "./huddle";
import { PrivyContextProvider } from "./privy";

export function AppContextProviders({ children }: { children: ReactNode }) {
    return (
        <CoinbaseMiniKitProvider>
            <HuddleContextProvider>
                <PrivyContextProvider>
                    <AuthenticationProvider>
                        <Fragment>{children}</Fragment>
                    </AuthenticationProvider>
                </PrivyContextProvider>
            </HuddleContextProvider>
        </CoinbaseMiniKitProvider>
    );
}
