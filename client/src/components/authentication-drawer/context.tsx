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

    const [state, dispatch] = React.useReducer(AuthenticationReducer, {
        type: "default",
        screenStack: ["default"],
    });

    const [drawerState, setDrawerState] = React.useState<iDrawerState>(() => ({
        isDrawerOpen: false,
        isLoggingOut: false,
    }));

    const { login } = useWalletAuthentication({ dispatch, setDrawerState });

    // React.useEffect(() => {
    //     if (state.type === "wallet" && !hasLoggedInRef.current) {
    //         hasLoggedInRef.current = true;
    //         setDrawerState((previous) => ({ ...previous, isDrawerOpen: false }));

    //         login({
    //             loginMethods: ["wallet"],
    //             walletChainType: "ethereum-only",
    //         });
    //     }

    //     if (state.type !== "wallet") {
    //         hasLoggedInRef.current = false;
    //     }

    //     if (state.type === "farcaster" && !hasLoggedInRef.current) {
    //         hasLoggedInRef.current = true;
    //         setDrawerState((previous) => ({ ...previous, isDrawerOpen: false }));

    //         login({
    //             loginMethods: ["farcaster"],
    //         });
    //     }

    //     if (state.type !== "farcaster") {
    //         hasLoggedInRef.current = false;
    //     }
    // }, [state.type, login]);

    const prevTypeRef = React.useRef<string | null>(null);

    React.useEffect(() => {
        if (prevTypeRef.current !== state.type) {
            // Transition detected
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
        prevTypeRef.current = state.type;
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
