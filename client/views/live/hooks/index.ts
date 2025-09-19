import { Context, createContext, useContext } from "react";

export const LiveStreamContext: Context<LiveStreamContextValue> = createContext({} as LiveStreamContextValue);

export function useLiveStreamContext(): LiveStreamContextValue {
    const context = useContext(LiveStreamContext);

    if (context === undefined || context === null || !context) {
        throw new Error("useLiveStreamContext must be used within a LiveStreamProvider");
    }

    return context;
}

export function useLiveStreamPermissions() {
    return useLiveStreamContext().permissions;
}

export function useLiveStreamRoles() {
    return useLiveStreamContext().roomRole;
}

export function useLiveStreamParticipants() {
    return useLiveStreamContext().roomParticipants;
}
