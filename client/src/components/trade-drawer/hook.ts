import React from "react";

export const TradeCreatorTokenContext = React.createContext<iTradeCreatorTokenContext | null>(null);

export function useTradeCreatorTokenContext() {
    const context = React.useContext(TradeCreatorTokenContext);

    if (!context)
        throw new Error(
            "useTradeCreatorTokenContext must be used within a TradeCreatorTokenContextProvider",
        );

    return context;
}
