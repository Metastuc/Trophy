import { useCallback, useEffect, useState } from "react";

import { useSocket } from "@/hooks/socket";

export function useGuestsInvitations(roomId: string) {
    const socket = useSocket();

    const [guestActionsState, setGuestActionsState] = useState<LiveStreamGuestsActionsState>({
        incomingInvites: [],
        pendingGuestsInvitations: [],
        searchQuery: "",
        selectedGuests: [],
    });

    console.log(guestActionsState);

    const handleSearchQuery = useCallback(function (query: string) {
        setGuestActionsState((state) => ({ ...state, searchQuery: query }));
    }, []);

    const addPendingGuestInvitation = useCallback(function (userId: RedisParticipant["id"]) {
        setGuestActionsState((state) => ({
            ...state,
            pendingGuestsInvitations: state.pendingGuestsInvitations.includes(userId)
                ? state.pendingGuestsInvitations
                : [...state.pendingGuestsInvitations, userId],
        }));
    }, []);

    const removePendingGuestInvitation = useCallback(function (userId: RedisParticipant["id"]) {
        setGuestActionsState((state) => ({
            ...state,
            pendingGuestsInvitations: state.pendingGuestsInvitations.filter((id) => id !== userId),
        }));
    }, []);

    const toggleSelectedGuest = useCallback(function (userId: RedisParticipant["id"]) {
        setGuestActionsState((state) => ({
            ...state,
            selectedGuests: state.selectedGuests.includes(userId)
                ? state.selectedGuests.filter((id) => id !== userId)
                : [...state.selectedGuests, userId],
        }));
    }, []);

    const inviteGuest = useCallback(
        (userId: RedisParticipant["id"]) => socket.emit("guest.invite", { roomId, userId }),
        [socket, roomId],
    );

    const cancelInvite = useCallback(
        (userId: RedisParticipant["id"]) => socket.emit("guest.cancel", { roomId, userId }),
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
        (userId: RedisParticipant["id"]) => socket.emit("guest.revoke", { roomId, userId }),
        [socket, roomId],
    );

    useEffect(
        function () {
            if (!roomId) return;

            function handleGuestInvitation({ userId }: { userId: RedisParticipant["id"] }) {
                setGuestActionsState((state) => ({
                    ...state,
                    incomingInvites: state.incomingInvites.includes(userId)
                        ? state.incomingInvites
                        : [...state.incomingInvites, userId],
                }));
                addPendingGuestInvitation(userId);
            }

            function handleGuestRemoval({ userId }: { userId: RedisParticipant["id"] }) {
                setGuestActionsState((state) => ({
                    ...state,
                    incomingInvites: state.incomingInvites.filter((id) => id !== userId),
                    selectedGuests: state.selectedGuests.filter((id) => id !== userId),
                }));
                removePendingGuestInvitation(userId);
            }

            socket.on("guest.invited", handleGuestInvitation);
            socket.on("guest.canceled", handleGuestRemoval);
            socket.on("guest.denied", handleGuestRemoval);
            socket.on("guest.revoked", handleGuestRemoval);
            socket.on("guest.accepted", handleGuestRemoval);

            return function () {
                socket.off("guest.invited", handleGuestInvitation);
                socket.off("guest.canceled", handleGuestRemoval);
                socket.off("guest.denied", handleGuestRemoval);
                socket.off("guest.revoked", handleGuestRemoval);
                socket.off("guest.accepted", handleGuestRemoval);
            };
        },

        [socket, roomId, addPendingGuestInvitation, removePendingGuestInvitation],
    );

    return {
        ...guestActionsState,
        acceptInvite,
        addPendingGuestInvitation,
        cancelInvite,
        denyInvite,
        handleSearchQuery,
        inviteGuest,
        removePendingGuestInvitation,
        revokeInvite,
        toggleSelectedGuest,
    };
}
