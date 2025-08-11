import { Context, createContext, useContext } from "react";

export const StreamingUIContext: Context<iStreamingUIContext> = createContext<iStreamingUIContext>(
    {} as iStreamingUIContext,
);

export function useStreamingUIContext(): iStreamingUIContext {
    const context: iStreamingUIContext = useContext(StreamingUIContext);

    if (context === undefined || context === null || !context)
        throw new Error("useStreamingUIContext must be used within a StreamingUIContextProvider");

    return context;
}

export function useStreamingUIPermissions(): iStreamingUIPermissions {
    return useContext(StreamingUIContext).permissions;
}

export function useStreamingUIRoles(): iRoomRoles {
    return useContext(StreamingUIContext).roomRoles;
}

export function useStreamingUICoHostInvitation(): iCoHostInvitationHandler {
    return useContext(StreamingUIContext).coHostInvitationHandler;
}

export function useStreamingUIScreenShare(): iScreenShareHandler {
    return useContext(StreamingUIContext).screenShareHandler;
}
