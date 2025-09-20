import { PropsWithChildren, useMemo, useState } from "react";

import { LiveStreamContext } from "./hooks";
import { useGuestsInvitations } from "./hooks/guests";
import { useHuddleJoinRoom } from "./hooks/huddle";
import { useHuddleHostPublish } from "./hooks/publish";
import { useRoomParticipants } from "./hooks/streamers";

type LiveStreamContextProviderProps = JoinStreamData &
    PropsWithChildren<{
        roomId: string;
        roomUsername: string;
    }>;

export function LiveStreamContextProvider({
    children,
    creatorProfileImage,
    creatorToken,
    creatorUsername,
    creatorWalletAddress,
    role: serverRole,
    roomId,
    roomUsername,
    title,
    token,
}: LiveStreamContextProviderProps) {
    const huddle = useHuddleJoinRoom({ roomId, token, username: roomUsername, serverRole });
    useHuddleHostPublish(huddle.role);

    const roomParticipants = useRoomParticipants(roomId);
    const guestInvitations = useGuestsInvitations({ roomId, username: roomUsername });

    const [isInvitationDrawerOpen, setIsInvitationDrawerOpen] = useState<boolean>(false);

    function openInvitationDrawer() {
        setIsInvitationDrawerOpen(true);
    }

    function closeInvitationDrawer() {
        setIsInvitationDrawerOpen(false);
    }

    const permissions: RoomPermissions = useMemo(
        () => ({
            canEndStream: huddle.role === "host",
            canInvite: huddle.role === "host",
            canShareScreen: huddle.role === "host" || huddle.role === "guest",
            canToggleAudio: huddle.role === "host" || huddle.role === "guest",
            canToggleChat: huddle.role === "host",
            canToggleVideo: huddle.role === "host" || huddle.role === "guest",
        }),
        [huddle.role],
    );

    const roomRole: RoomRoles = useMemo(
        () => ({
            host: huddle.role === "host",
            guest: huddle.role === "guest",
            listener: huddle.role === "listener",
        }),
        [huddle.role],
    );

    const value: LiveStreamContextValue = useMemo(
        () => ({
            closeInvitationDrawer,
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            huddleRole: huddle.role,
            isHuddleConnected: huddle.isHuddleConnected,
            isInvitationDrawerOpen,
            openInvitationDrawer,
            permissions,
            roomId,
            roomParticipants,
            roomRole,
            serverRole,
            title,
            token,
            guestInvitations,
        }),
        [
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            huddle.isHuddleConnected,
            huddle.role,
            isInvitationDrawerOpen,
            permissions,
            roomId,
            roomParticipants,
            roomRole,
            serverRole,
            title,
            token,
            guestInvitations,
        ],
    );

    return <LiveStreamContext.Provider value={value}>{children}</LiveStreamContext.Provider>;
}
