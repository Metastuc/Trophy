import { useCallback, useEffect, useState } from "react";

import { useSocket } from "@/hooks/socket";

export function useGuestsInvitations(roomId: string) {
    const socket = useSocket();

    const [guestActionsState, setGuestActionsState] = useState<LiveStreamGuestsActionsState>({
        activeGuests: [],
        incomingInvites: [],
        pendingGuests: [],
        searchQuery: "",
    });

    const inviteGuest = useCallback(
        function (userId: RedisParticipant["id"]) {
            socket.emit("guest.invite", { roomId, userId });
            setGuestActionsState((state) => ({
                ...state,
                pendingGuests: state.pendingGuests.includes(userId)
                    ? state.pendingGuests
                    : [...state.pendingGuests, userId],
            }));
        },
        [socket, roomId],
    );

    const cancelInvite = useCallback(
        function (userId: RedisParticipant["id"]) {
            socket.emit("guest.cancel", { roomId, userId });
            setGuestActionsState((state) => ({
                ...state,
                pendingGuests: state.pendingGuests.filter((id) => id !== userId),
            }));
        },
        [socket, roomId],
    );

    const acceptInvite = useCallback(
        (userId: RedisParticipant["id"]) => socket.emit("guest.accept", { roomId, userId }),
        [socket, roomId],
    );

    const denyInvite = useCallback(
        (userId: RedisParticipant["id"]) => socket.emit("guest.deny", { roomId, userId }),
        [socket, roomId],
    );

    const revokeInvite = useCallback(
        function (userId: RedisParticipant["id"]) {
            socket.emit("guest.revoke", { roomId, userId });
            setGuestActionsState((state) => ({
                ...state,
                activeGuests: state.activeGuests.filter((id) => id !== userId),
            }));
        },
        [socket, roomId],
    );

    console.log(guestActionsState);

    const handleSearchQuery = useCallback(function (query: string) {
        setGuestActionsState((state) => ({ ...state, searchQuery: query }));
    }, []);

    const addPendingGuestInvitation = useCallback(function (userId: RedisParticipant["id"]) {
        setGuestActionsState((state) => ({
            ...state,
            pendingGuests: state.pendingGuests.includes(userId)
                ? state.pendingGuests
                : [...state.pendingGuests, userId],
        }));
    }, []);

    const removePendingGuestInvitation = useCallback(function (userId: RedisParticipant["id"]) {
        setGuestActionsState((state) => ({
            ...state,
            pendingGuests: state.pendingGuests.filter((id) => id !== userId),
        }));
    }, []);

    const toggleSelectedGuest = useCallback(
        function (userId: RedisParticipant["id"]) {
            setGuestActionsState(function (state) {
                if (state.activeGuests.includes(userId)) {
                    revokeInvite(userId);
                    return {
                        ...state,
                        activeGuests: state.activeGuests.filter((id) => id !== userId),
                    };
                }

                if (state.pendingGuests.includes(userId)) {
                    cancelInvite(userId);
                    return {
                        ...state,
                        pendingGuests: state.pendingGuests.filter((id) => id !== userId),
                    };
                }

                inviteGuest(userId);
                return {
                    ...state,
                    pendingGuests: [...state.pendingGuests, userId],
                };
            });
        },
        [cancelInvite, inviteGuest, revokeInvite],
    );

    useEffect(
        function () {
            if (!roomId) return;

            function handleInvited({ userId }: { userId: string }) {
                setGuestActionsState((state) => ({
                    ...state,
                    incomingInvites: state.incomingInvites.includes(userId)
                        ? state.incomingInvites
                        : [...state.incomingInvites, userId],
                }));
            }

            function handleAccepted({ userId }: { userId: string }) {
                setGuestActionsState((state) => ({
                    ...state,
                    pendingGuests: state.pendingGuests.filter((id) => id !== userId),
                    activeGuests: state.activeGuests.includes(userId)
                        ? state.activeGuests
                        : [...state.activeGuests, userId],
                }));
            }

            function handleRemoved({ userId }: { userId: string }) {
                setGuestActionsState((state) => ({
                    ...state,
                    pendingGuests: state.pendingGuests.filter((id) => id !== userId),
                    activeGuests: state.activeGuests.filter((id) => id !== userId),
                    incomingInvites: state.incomingInvites.filter((id) => id !== userId),
                }));
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

        [socket, roomId, addPendingGuestInvitation, removePendingGuestInvitation],
    );

    return {
        ...guestActionsState,
        acceptInvite,
        addPendingGuestInvitation,
        denyInvite,
        handleSearchQuery,
        removePendingGuestInvitation,
        toggleSelectedGuest,
    };
}
