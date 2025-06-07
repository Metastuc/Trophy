import React from "react";

import { useWalletAuthentication } from "./hooks";
import { AuthenticationReducer } from "./utils";

export const AuthenticationDrawerContext: React.Context<iAuthenticationDrawerContext> =
    React.createContext<iAuthenticationDrawerContext>({} as iAuthenticationDrawerContext);

export function useAuthenticationDrawerContext(): iAuthenticationDrawerContext {
    const context: iAuthenticationDrawerContext = React.useContext(AuthenticationDrawerContext);

    if (context === undefined || context === null || !context)
        throw new Error(
            "useAuthenticationDrawerContext must be used within a AuthenticationDrawerContextProvider",
        );

    return context;
}

export function AuthenticationDrawerContextProvider({ children }: { children: React.ReactNode }) {
    const hasLoggedInRef = React.useRef<boolean>(false);
    const authStateChangeRef = React.useRef<string | null>(null);

    const [state, dispatch] = React.useReducer(AuthenticationReducer, {
        type: "default",
        screenStack: ["default"],
    });

    const [drawerState, setDrawerState] = React.useState<iDrawerState>(() => ({
        isDrawerOpen: false,
        isLoggingOut: false,
    }));

    function handleHasLoggedInRef() {
        hasLoggedInRef.current = false;
    }

    const { login } = useWalletAuthentication({ dispatch, handleHasLoggedInRef, setDrawerState });

    React.useEffect(() => {
        if (authStateChangeRef.current !== state.type) {
            if (state.type === "wallet" && !hasLoggedInRef.current) {
                hasLoggedInRef.current = true;
                setDrawerState((prev) => ({ ...prev, isDrawerOpen: false }));

                login({ loginMethods: ["wallet"], walletChainType: "ethereum-only" });
            }

            if (state.type === "farcaster" && !hasLoggedInRef.current) {
                hasLoggedInRef.current = true;
                setDrawerState((prev) => ({ ...prev, isDrawerOpen: false }));

                login({ loginMethods: ["farcaster"] });
            }
        }

        authStateChangeRef.current = state.type;
    }, [state.type, login]);

    const contextValue = {
        dispatch,
        drawerState,
        setDrawerState,
        state,
    };
    return (
        <AuthenticationDrawerContext.Provider value={contextValue}>
            {children}
        </AuthenticationDrawerContext.Provider>
    );
}
