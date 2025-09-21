import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useSocket } from "@/hooks/socket";
import { CLIENT_CONSTANTS } from "@/lib/constants";

import { updateGuestInvitationsState } from "../utils";

export function useGuestsInvitations({ roomId, username }: { roomId: string; username: string }) {
    const socket = useSocket();

    const [guestActionsState, setGuestActionsState] = useState<LiveStreamGuestsActionsState>({
        activeGuests: [],
        incomingInvites: [],
        pendingGuests: [],
        searchQuery: "",
    });

    const stateRef = useRef<LiveStreamGuestsActionsState>(guestActionsState);

    const inviteGuest = useCallback(
        function (to: RedisParticipant["id"]) {
            socket.emit("guest.invite", { roomId, from: username, to });
            setGuestActionsState((state) => ({
                ...state,
                pendingGuests: state.pendingGuests.includes(to) ? state.pendingGuests : [...state.pendingGuests, to],
            }));
        },
        [socket, roomId, username],
    );

    const cancelInvite = useCallback(
        function (to: RedisParticipant["id"]) {
            socket.emit("guest.cancel", { roomId, from: username, to });
            setGuestActionsState((state) => ({
                ...state,
                pendingGuests: state.pendingGuests.filter((id) => id !== to),
            }));
        },
        [socket, roomId, username],
    );

    const acceptInvite = useCallback(
        (from: RedisParticipant["id"]) => socket.emit("guest.accept", { roomId, from, to: username }),
        [socket, roomId, username],
    );

    const denyInvite = useCallback(
        (from: RedisParticipant["id"]) => socket.emit("guest.deny", { roomId, from, to: username }),
        [socket, roomId, username],
    );

    const revokeInvite = useCallback(
        function (to: RedisParticipant["id"]) {
            socket.emit("guest.revoke", { roomId, userId: to });
            setGuestActionsState((state) => ({
                ...state,
                activeGuests: state.activeGuests.filter((id) => id !== to),
            }));
        },
        [socket, roomId],
    );

    console.log(guestActionsState);

    const handleSearchQuery = useCallback(function (query: string) {
        setGuestActionsState((state) => ({ ...state, searchQuery: query }));
    }, []);

    const toggleSelectedGuest = useCallback(
        function (userId: RedisParticipant["id"]) {
            const state = stateRef.current;

            if (
                !state.activeGuests.includes(userId) &&
                !state.pendingGuests.includes(userId) &&
                state.activeGuests.length >= CLIENT_CONSTANTS.TOTAL_CO_HOSTS_ALLOWED
            ) {
                toast.error(`Maximum of ${CLIENT_CONSTANTS.TOTAL_CO_HOSTS_ALLOWED} co-hosts reached.`);
                return;
            }

            if (state.activeGuests.includes(userId)) return revokeInvite(userId);
            if (state.pendingGuests.includes(userId)) return cancelInvite(userId);
            return inviteGuest(userId);
        },
        [cancelInvite, inviteGuest, revokeInvite],
    );

    useEffect(
        function () {
            stateRef.current = guestActionsState;
        },
        [guestActionsState],
    );

    useEffect(() => {
        if (!roomId || !username) return;
        console.log("Syncing guests invitations");

        socket.emit("guest.sync", { roomId, username });
    }, [socket, roomId, username]);

    useEffect(
        function () {
            if (!roomId) return;

            function handleIvitesRestore({
                sent,
                received,
                activeGuests,
            }: {
                sent: Array<string>;
                received: Array<string>;
                activeGuests: Array<string>;
            }) {
                setGuestActionsState((state) => ({
                    ...state,
                    pendingGuests: Array.from(new Set([...state.pendingGuests, ...sent])),
                    incomingInvites: Array.from(new Set([...state.incomingInvites, ...received])),
                    activeGuests: Array.from(new Set([...state.activeGuests, ...activeGuests])),
                }));
            }

            function handleAccepted({ from, to }: { from: string; to: string }) {
                setGuestActionsState((state) =>
                    updateGuestInvitationsState({ action: "accept", from, to, state, username }),
                );
            }

            function handleInvited({ from, to }: { from: string; to: string }) {
                setGuestActionsState((state) =>
                    updateGuestInvitationsState({ action: "invite", from, to, state, username }),
                );
            }

            function handleDenied({ from, to }: { from: string; to: string }) {
                setGuestActionsState((state) =>
                    updateGuestInvitationsState({ action: "deny", from, to, state, username }),
                );
            }

            function handleCanceled({ from, to }: { from: string; to: string }) {
                setGuestActionsState((state) =>
                    updateGuestInvitationsState({ action: "cancel", from, to, state, username }),
                );
            }

            function handleRevoked({ userId }: { userId: string }) {
                setGuestActionsState((state) =>
                    updateGuestInvitationsState({ action: "revoke", from: userId, to: undefined, state, username }),
                );
            }

            socket.on("guest.accepted", handleAccepted);
            socket.on("guest.canceled", handleCanceled);
            socket.on("guest.denied", handleDenied);
            socket.on("guest.invited", handleInvited);
            socket.on("guest.invites.restore", handleIvitesRestore);
            socket.on("guest.limit", ({ message }) => toast.error(message));
            socket.on("guest.revoked", handleRevoked);

            return () => {
                socket.off("guest.accepted", handleAccepted);
                socket.off("guest.canceled", handleCanceled);
                socket.off("guest.denied", handleDenied);
                socket.off("guest.invited", handleInvited);
                socket.off("guest.invites.restore", handleIvitesRestore);
                socket.off("guest.limit");
                socket.off("guest.revoked", handleRevoked);
            };
        },

        [socket, roomId, username],
    );

    return {
        ...guestActionsState,
        acceptInvite,
        denyInvite,
        handleSearchQuery,
        toggleSelectedGuest,
    };
}
