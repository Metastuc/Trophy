import { usePrivy, type User } from "@privy-io/react-auth";
import React from "react";

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
    const { authenticated, logout, ready, user: privyUser } = usePrivy();

    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(authenticated);
    const [user, setUser] = React.useState<User | null>(privyUser);

    React.useEffect(
        function () {
            if (ready) {
                setIsAuthenticated(authenticated);
                setUser(privyUser);
            }
        },
        [ready, authenticated, privyUser],
    );

    const value: iAuthenticationContext = React.useMemo(
        function () {
            return { isAuthenticated, logout, user };
        },
        [isAuthenticated, logout, user],
    );

    return (
        <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
    );
}
