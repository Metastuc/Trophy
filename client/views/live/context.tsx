import { PropsWithChildren, useMemo } from "react";

import { LiveStreamContext } from "./hooks";
import { useHuddleJoinRoom } from "./hooks/huddle";
// import { useHuddleHostPublish } from "./hooks/publish";

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
    const huddle = useHuddleJoinRoom({ roomId, token, username: roomUsername });
    // useHuddleHostPublish(huddle.role);

    const permissions = useMemo(
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

    const value = useMemo(
        () => ({
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            huddleRole: huddle.role,
            permissions,
            roomId,
            serverRole,
            title,
            token,
        }),
        [
            creatorProfileImage,
            creatorToken,
            creatorUsername,
            creatorWalletAddress,
            huddle.role,
            permissions,
            roomId,
            serverRole,
            title,
            token,
        ],
    );

    return <LiveStreamContext.Provider value={value}>{children}</LiveStreamContext.Provider>;
}
