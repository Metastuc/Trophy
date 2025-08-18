import { Context, createContext, useContext } from "react";

export const FeedContext: Context<iFeedContext> = createContext<iFeedContext>({} as iFeedContext);

export function useFeedContext() {
    const context = useContext(FeedContext);

    if (context === undefined || context === null || !context)
        throw new Error("useFeedContext must be used within a FeedContextProvider");

    return context;
}
