import { useCallback, useEffect, useRef, useState } from "react";

import { useSocket } from "@/hooks/socket";

export function useGuestsInvitations({ roomId, username }: { roomId: string; username: string }) {
    const socket = useSocket();

    const [guestActionsState, setGuestActionsState] = useState<LiveStreamGuestsActionsState>({
        activeGuests: [],
        incomingInvites: [],
        pendingGuests: [],
        searchQuery: "",
    });

    const stateRef = useRef<LiveStreamGuestsActionsState>(guestActionsState);
    useEffect(
        function () {
            stateRef.current = guestActionsState;
        },
        [guestActionsState],
    );

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

            if (state.activeGuests.includes(userId)) {
                revokeInvite(userId);
                return;
            }

            if (state.pendingGuests.includes(userId)) {
                cancelInvite(userId);
                return;
            }

            inviteGuest(userId);
        },
        [cancelInvite, inviteGuest, revokeInvite],
    );

    useEffect(
        function () {
            if (!roomId) return;

            function handleInvited({ from, to }: { from: string; to: string }) {
                setGuestActionsState(function (state) {
                    if (from === username) {
                        return {
                            ...state,
                            pendingGuests: state.pendingGuests.includes(to)
                                ? state.pendingGuests
                                : [...state.pendingGuests, to],
                        };
                    }

                    if (to === username) {
                        return {
                            ...state,
                            incomingInvites: state.incomingInvites.includes(from)
                                ? state.incomingInvites
                                : [...state.incomingInvites, from],
                        };
                    }

                    return state;
                });
            }

            function handleAccepted({ from, to }: { from: string; to: string }) {
                setGuestActionsState(function (state) {
                    if (to === username) {
                        return {
                            ...state,
                            pendingGuests: state.pendingGuests.filter((id) => id !== from),
                            activeGuests: state.activeGuests.includes(from)
                                ? state.activeGuests
                                : [...state.activeGuests, from],
                        };
                    }

                    if (from === username) {
                        return {
                            ...state,
                            incomingInvites: state.incomingInvites.filter((id) => id !== to),
                            activeGuests: state.activeGuests.includes(to)
                                ? state.activeGuests
                                : [...state.activeGuests, to],
                        };
                    }

                    return state;
                });
            }

            function handleRemoved({ from, to }: { from: string; to: string }) {
                setGuestActionsState(function (state) {
                    if (from === username) {
                        return {
                            ...state,
                            pendingGuests: state.pendingGuests.filter((id) => id !== to),
                            activeGuests: state.activeGuests.filter((id) => id !== to),
                        };
                    }

                    if (to === username) {
                        return {
                            ...state,
                            incomingInvites: state.incomingInvites.filter((id) => id !== from),
                            activeGuests: state.activeGuests.filter((id) => id !== from),
                        };
                    }

                    return state;
                });
            }

            socket.on("guest.invited", handleInvited);
            socket.on("guest.accepted", handleAccepted);
            socket.on("guest.canceled", handleRemoved);
            socket.on("guest.denied", handleRemoved);
            socket.on("guest.revoked", handleRemoved);

            return () => {
                socket.off("guest.invited", handleInvited);
                socket.off("guest.accepted", handleAccepted);
                socket.off("guest.canceled", handleRemoved);
                socket.off("guest.denied", handleRemoved);
                socket.off("guest.revoked", handleRemoved);
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
