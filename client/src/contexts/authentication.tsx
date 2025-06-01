import { usePrivy, type User } from "@privy-io/react-auth";
import React from "react";

export interface iAuthenticationContext {
    isAuthenticated: boolean;
    isReady: boolean;
    logout: () => Promise<void>;
    user: User | null;
}

export const AuthenticationContext: React.Context<iAuthenticationContext> =
    React.createContext<iAuthenticationContext>({} as iAuthenticationContext);

export function useAuthenticationContext(): iAuthenticationContext {
    const context: iAuthenticationContext = React.useContext(AuthenticationContext);

    if (context === undefined || context === null || !context)
        throw new Error(
            "useAuthenticationContext must be used within a AuthenticationContextProvider",
        );

    return context;
}

export function AuthenticationContextProvider({ children }: { children: React.ReactNode }) {
    const { authenticated, logout, ready, user } = usePrivy();

    const value: iAuthenticationContext = React.useMemo(
        function () {
            return {
                isAuthenticated: authenticated,
                isReady: ready,
                logout,
                user,
            };
        },
        [authenticated, ready, logout, user],
    );

    return (
        <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
    );
}
