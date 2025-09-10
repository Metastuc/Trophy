import { PrivyProvider } from "@privy-io/react-auth";

import { CLIENT_ENV } from "@/lib/constants";

export function PrivyContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider appId={CLIENT_ENV.VITE_PRIVY_APP_ID} clientId={CLIENT_ENV.VITE_PRIVY_CLIENT_ID}>
            {children}
        </PrivyProvider>
    );
}
