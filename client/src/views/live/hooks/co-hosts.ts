import { useDataMessage } from "@huddle01/react";
import { useState } from "react";

export function useCoHostInvitationHandler(roles: iRoomRoles): iCoHostInvitationHandler {
    const [coHostInvitationState, setCoHostInvitationState] = useState<iCoHostInvitationState>(() => ({
        acceptedPeerId: null,
        activeCoHosts: [],
        pendingInvitations: [],
        pendingRoleUpdates: [],
    }));

    const { sendData } = useDataMessage({
        onMessage(payload, from, label) {
            if (label !== "INVITE") return;

            switch (payload as tInviteActions) {
                case "accept":
                    /**
                     * co-host accepted invite
                     */
                    if (roles.host) {
                        setCoHostInvitationState((state) => ({
                            ...state,
                            pendingInvitations: state.pendingInvitations.filter((id) => id !== from),
                            activeCoHosts: [...state.activeCoHosts, from],
                            pendingRoleUpdates: [...state.pendingRoleUpdates, { peerId: from, role: "coHost" }],
                        }));
                    }
                    break;

                case "deny":
                    /**
                     * co-host denied invite
                     */
                    if (roles.host) {
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
                        setCoHostInvitationState(function (state) {
                            if (state.pendingInvitations.includes(from)) {
                                return state;
                            }

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
                    if (!roles.host) {
                        setCoHostInvitationState((state) => ({
                            ...state,
                            pendingInvitations: state.pendingInvitations.filter((id) => id !== from),
                        }));
                    }
                    break;

                case "revoke":
                    /**
                     * co-host revoked invite
                     */
                    if (!roles.host) {
                        setCoHostInvitationState((state) => ({
                            ...state,
                            acceptedPeerId: null,
                        }));
                    }

                    break;
            }
        },
    });

    function sendCoHostInvite({ peerID }: { peerID: string }) {
        if (!roles.host) return;

        sendData({
            to: [peerID],
            payload: "invite",
            label: "INVITE",
        });

        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: [...state.pendingInvitations, peerID],
        }));
    }

    function cancelCoHostInvite({ peerID }: { peerID: string }) {
        if (!roles.host) return;

        sendData({
            to: [peerID],
            payload: "cancel",
            label: "INVITE",
        });

        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: state.pendingInvitations.filter((id) => id !== peerID),
        }));
    }

    function revokeCoHostInvite({ peerID }: { peerID: string }) {
        if (!roles.host) return;

        sendData({
            to: [peerID],
            payload: "revoke",
            label: "INVITE",
        });

        setCoHostInvitationState((state) => ({
            ...state,
            activeCoHosts: state.activeCoHosts.filter((id) => id !== peerID),
            pendingRoleUpdates: [...state.pendingRoleUpdates, { peerId: peerID, role: "listener" }],
        }));
    }

    function acceptCoHostInvite({ hostID }: { hostID: string }) {
        if (roles.host) return;

        sendData({
            to: [hostID],
            payload: "accept",
            label: "INVITE",
        });

        setCoHostInvitationState((state) => ({
            ...state,
            pendingInvitations: state.pendingInvitations.filter((id) => id !== hostID),
            acceptedPeerId: hostID,
        }));
    }

    function denyCoHostInvite({ hostID }: { hostID: string }) {
        if (roles.host) return;

        sendData({
            to: [hostID],
            payload: "deny",
            label: "INVITE",
        });

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
        setCoHostInvitationState,
    };
}
