import { PropsWithChildren, useMemo, useState } from "react";

import { LiveStreamContext } from "./hooks";
import { useGuestsInvitations } from "./hooks/guests";
import { useHuddleJoinRoom } from "./hooks/huddle";
import { useHuddleHostPublish } from "./hooks/publish";
import { useRoomScreenShareSync } from "./hooks/screen-sharing";
import { useRoomParticipants } from "./hooks/streamers";
import { useRoomViewers } from "./hooks/viewers";

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

    useRoomViewers({ isConnected: huddle.isHuddleConnected, roomId, username: roomUsername });
    useHuddleHostPublish(huddle.role);

    const roomParticipants = useRoomParticipants(roomId);
    const guestInvitations = useGuestsInvitations({ roomId, username: roomUsername });
    const screenSharing = useRoomScreenShareSync({ roomId, username: roomUsername });

    const [isInvitationDrawerOpen, setIsInvitationDrawerOpen] = useState<boolean>(false);
    const localRole = roomParticipants.localStreamer?.role;

    function openInvitationDrawer() {
        setIsInvitationDrawerOpen(true);
    }

    function closeInvitationDrawer() {
        setIsInvitationDrawerOpen(false);
    }

    const permissions: RoomPermissions = useMemo(
        () => ({
            canEndStream: localRole === "host",
            canInvite: localRole === "host",
            canShareScreen: localRole === "host" || localRole === "guest",
            canToggleAudio: localRole === "host" || localRole === "guest",
            canToggleChat: localRole === "host",
            canToggleVideo: localRole === "host" || localRole === "guest",
        }),
        [localRole],
    );

    const roomRole: RoomRoles = useMemo(
        () => ({
            host: localRole === "host",
            guest: localRole === "guest",
            listener: localRole === "listener",
        }),
        [localRole],
    );

    const value: LiveStreamContextValue = useMemo(
        () => ({
            closeInvitationDrawer,
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            guestInvitations,
            huddleRole: huddle.role,
            isHuddleConnected: huddle.isHuddleConnected,
            isInvitationDrawerOpen,
            openInvitationDrawer,
            permissions,
            roomId,
            roomParticipants,
            roomRole,
            screenSharing,
            serverRole,
            title,
            token,
        }),
        [
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            guestInvitations,
            huddle.isHuddleConnected,
            huddle.role,
            isInvitationDrawerOpen,
            permissions,
            roomId,
            roomParticipants,
            roomRole,
            screenSharing,
            serverRole,
            title,
            token,
        ],
    );

    return <LiveStreamContext.Provider value={value}>{children}</LiveStreamContext.Provider>;
}
