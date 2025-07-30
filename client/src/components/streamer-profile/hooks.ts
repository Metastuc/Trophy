import React from "react";

export const CreatorProfileContext = React.createContext<iCreatorProfileContext | null>(null);

export function useCreatorProfileContext() {
    const context = React.useContext(CreatorProfileContext);

    if (!context) throw new Error("useCreatorProfileContext must be used within a CreatorProfileContextProvider");

    return context;
}
