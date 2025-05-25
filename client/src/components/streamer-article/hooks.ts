import React from "react";

export const StreamArticleContext = React.createContext<iStreamArticle | null>(null);

export function useStreamArticleContext() {
    const context = React.useContext(StreamArticleContext);

    if (!context)
        throw new Error(
            "useStreamArticleContext must be used within a StreamArticleContextProvider",
        );

    return context;
}
