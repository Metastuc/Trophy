import { createContext, useContext } from "react";

export const StreamingUIContext: React.Context<iStreamingUIContext> = createContext<iStreamingUIContext>(
    {} as iStreamingUIContext,
);

export function useStreamingUIContext() {
    const context: iStreamingUIContext = useContext(StreamingUIContext);

    if (context === undefined || context === null || !context)
        throw new Error("useStreamingUIContext must be used within a StreamingUIContextProvider");

    return context;
}

export function useStreamingUIPermissions() {
    const context: iStreamingUIContext = useContext(StreamingUIContext);
    return context.permissions;
}

export function useStreamingUIRoles() {
    const context: iStreamingUIContext = useContext(StreamingUIContext);
    return context.roomRoles;
}
