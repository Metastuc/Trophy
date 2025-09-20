import { PropsWithChildren, useMemo, useState } from "react";

import { LiveStreamContext } from "./hooks";
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

    const [isInvitationDrawerOpen, setIsInvitationDrawerOpen] = useState<boolean>(false);

    function openInvitationDrawer() {
        setIsInvitationDrawerOpen(true);
    }

    function closeInvitationDrawer() {
        setIsInvitationDrawerOpen(false);
    }

    const value: LiveStreamContextValue = useMemo(
        () => ({
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            huddleRole: huddle.role,
            isHuddleConnected: huddle.isHuddleConnected,
            permissions,
            roomId,
            roomRole,
            serverRole,
            title,
            token,
            isInvitationDrawerOpen,
            openInvitationDrawer,
            closeInvitationDrawer,
            roomParticipants,
        }),
        [
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            huddle.isHuddleConnected,
            huddle.role,
            permissions,
            roomId,
            roomRole,
            serverRole,
            title,
            token,
            isInvitationDrawerOpen,
            roomParticipants,
        ],
    );

    return <LiveStreamContext.Provider value={value}>{children}</LiveStreamContext.Provider>;
}
