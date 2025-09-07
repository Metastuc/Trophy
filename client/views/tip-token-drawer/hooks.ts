import { createContext, useContext } from "react";

export const TipDrawerContext = createContext({} as TipDrawerContextValue);

export function useTipDrawerContext() {
    const context = useContext(TipDrawerContext);

    if (context === undefined || context === null || !context)
        throw new Error("useTipDrawerContext must be used within a TipDrawerContextProvider");

    return context;
}
