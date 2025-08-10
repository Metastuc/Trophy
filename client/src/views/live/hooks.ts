import { useDataMessage } from "@huddle01/react";
import { createContext, useContext, useState } from "react";

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
        acceptedPeerId: null,
        activeCoHosts: [],
        pendingInvitations: [],
    }));

    const { sendData } = useDataMessage({
        onMessage(payload, from, label) {
            if (label !== "INVITE") return;

            console.log("[DataMessage received]", { payload, from, label });

            switch (payload as tInviteActions) {
                case "accept":
                    /**
                     * co-host accepted invite
                     */
                    if (roles.host) {
                        console.log(`Host: Peer ${from} accepted co-host invite`);
                        setCoHostInvitationState((state) => ({
                            ...state,
                            pendingInvitations: state.pendingInvitations.filter((id) => id !== from),
                            activeCoHosts: [...state.activeCoHosts, from],
                        }));
                    }
                    break;

                case "deny":
                    /**
                     * co-host denied invite
                     */
                    if (roles.host) {
                        console.log(`Host: Peer ${from} denied co-host invite`);

                        setCoHostInvitationState((state) => ({
                            ...state,
                            pendingInvitations: state.pendingInvitations.filter((id) => id !== from),
                        }));
                    }
                    break;

                case "invite":
                    /**
                     * host sent invite
                     */
                    if (!roles.host) {
                        setCoHostInvitationState(function (state: iCoHostInvitationState) {
                            if (state.pendingInvitations.includes(from)) {
                                return state;
                            }

                            console.log(`Viewer: Adding hostId ${from} to pendingInvitations`);

                            return {
                                ...state,
                                pendingInvitations: [...state.pendingInvitations, from],
                            };
                        });
                    }
                    break;

                case "cancel":
                    /**
                     * host cancelled invite
                     */
                    setCoHostInvitationState((state) => ({
                        ...state,
                        pendingInvitations: state.pendingInvitations.filter((id) => id !== from),
                    }));
                    break;

                case "revoke":
                    /**
                     * co-host revoked invite
                     */
                    if (roles.host) {
                        setCoHostInvitationState((state) => ({
                            ...state,
                            activeCoHosts: state.activeCoHosts.filter((id) => id !== from),
                        }));
                    } else {
                        setCoHostInvitationState((state) => ({
                            ...state,
                            acceptedPeerId: null,
                        }));
                    }
                    break;
            }
        },
    });

    // "accept" | "cancel" | "deny" | "invite" | "revoke";

    function sendCoHostInvite({ peerID }: { peerID: string }) {
        if (!roles.host) return;
        console.log(`Host: Sending invite to ${peerID}`);

        sendData({ to: [peerID], payload: "invite", label: "INVITE" });
        setCoHostInvitationState((state) => ({ ...state, pendingInvitations: [...state.pendingInvitations, peerID] }));
    }

    function cancelCoHostInvite({ peerID }: { peerID: string }) {
        if (!roles.host) return;

        sendData({ to: [peerID], payload: "cancel", label: "INVITE" });
        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: state.pendingInvitations.filter((id) => id !== peerID),
        }));
    }

    function revokeCoHostInvite({ peerID }: { peerID: string }) {
        if (!roles.host) return;

        sendData({ to: [peerID], payload: "revoke", label: "INVITE" });
        setCoHostInvitationState((state) => ({
            ...state,
            activeCoHosts: state.activeCoHosts.filter((id) => id !== peerID),
        }));
    }

    function acceptCoHostInvite({ hostID }: { hostID: string }) {
        if (roles.host) return;
        console.log(`Viewer: Sending accept to ${hostID}`);

        sendData({ to: [hostID], payload: "accept", label: "INVITE" });
        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: state.pendingInvitations.filter((id) => id !== hostID),
            acceptedPeerId: hostID,
        }));
    }

    function denyCoHostInvite({ hostID }: { hostID: string }) {
        if (roles.host) return;
        console.log(`Viewer: Sending deny to ${hostID}`);

        sendData({ to: [hostID], payload: "deny", label: "INVITE" });
        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: state.pendingInvitations.filter((id) => id !== hostID),
        }));
    }

    return {
        coHostInvitationState,
        sendCoHostInvite,
        cancelCoHostInvite,
        revokeCoHostInvite,
        acceptCoHostInvite,
        denyCoHostInvite,
    };
}
