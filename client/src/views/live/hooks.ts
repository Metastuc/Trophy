import { useDataMessage, useRemotePeer } from "@huddle01/react";
import { createContext, useContext, useEffect, useState } from "react";

export const StreamingUIContext: React.Context<iStreamingUIContext> = createContext<iStreamingUIContext>(
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

export function useCoHostInvitationHandler(roles: iRoomRoles): iCoHostInvitationHandler {
    const [coHostInvitationState, setCoHostInvitationState] = useState<iCoHostInvitationState>(() => ({
        pendingInvitations: [],
        acceptedPeerId: null,
    }));

    const { sendData } = useDataMessage({
        onMessage(payload, from, label) {
            if (label !== "INVITE") return;

            if (payload === "CO-HOST_INVITE") {
                setCoHostInvitationState((state) => ({
                    ...state,
                    pendingInvitations: [...state.pendingInvitations, from],
                }));
            }

            if (payload === "CO-HOST_ACCEPT" && roles.host) {
                setCoHostInvitationState((state) => ({
                    ...state,
                    pendingInvitations: state.pendingInvitations.filter((id) => id !== from),
                    acceptedPeerId: from,
                }));
            }

            if (label === "INVITE") {
                return;
            }
        },
    });

    const remotePeer = useRemotePeer({ peerId: coHostInvitationState.acceptedPeerId ?? "" });

    function sendCoHostInvite(peerID: string) {
        sendData({
            to: [peerID],
            payload: "CO-HOST_INVITE",
            label: "INVITE",
        });

        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: [...state.pendingInvitations, peerID],
        }));
    }

    function acceptCoHostInvite(hostID: string) {
        sendData({
            to: [hostID],
            payload: "CO-HOST_ACCEPT",
            label: "INVITE",
        });
    }

    function denyCoHostInvite(hostID: string) {
        sendData({
            to: [hostID],
            payload: "CO-HOST_DENY",
            label: "INVITE",
        });

        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: state.pendingInvitations.filter((id) => id !== hostID),
        }));
    }

    useEffect(
        function () {
            if (coHostInvitationState.acceptedPeerId && roles.host) {
                remotePeer.updateRole("coHost");
                setCoHostInvitationState((state) => ({
                    ...state,
                    acceptedPeerId: null,
                }));
            }
        },
        [coHostInvitationState.acceptedPeerId, roles.host, remotePeer],
    );

    return {
        acceptCoHostInvite,
        coHostInvitationState,
        denyCoHostInvite,
        sendCoHostInvite,
    };
}
