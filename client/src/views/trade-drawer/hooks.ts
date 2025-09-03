import { Context, createContext, useContext } from "react";

export const TradeDrawerContext: Context<TradeDrawerContext> = createContext({} as TradeDrawerContext);

export function useTradeDrawerContext() {
    const context = useContext(TradeDrawerContext);

    if (context === undefined || context === null || !context)
        throw new Error("useTradeDrawerContext must be used within a TradeDrawerContextProvider");

    return useContext(TradeDrawerContext);
}
