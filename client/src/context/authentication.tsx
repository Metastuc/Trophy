"use client";

import React from "react";

interface iAuthenticationContext {
    isAuthenticated: boolean;
    login: (user: string) => void;
    logout: () => void;
    user: string;
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
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<string>("");

    const login = React.useCallback(function () {
        setIsAuthenticated(true);
        setUser("user");
    }, []);

    const logout = React.useCallback(function () {
        setIsAuthenticated(false);
        setUser("");
    }, []);

    const value: iAuthenticationContext = React.useMemo(
        function () {
            return { isAuthenticated, login, logout, user };
        },
        [isAuthenticated, login, logout, user],
    );

    return (
        <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
    );
}
