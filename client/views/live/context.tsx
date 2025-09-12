import { PropsWithChildren, useMemo } from "react";

import { LiveStreamContext } from "./hooks";
import { useHuddleJoinRoom } from "./hooks/huddle";

type LiveStreamContextProviderProps = PropsWithChildren<{
    participants: { id: string; role: string };
    profileImage: string;
    role: "host" | "guest" | "listener";
    roomId: string;
    title: string;
    token: string;
    username: string;
}>;

export function LiveStreamContextProvider({
    children,
    participants,
    profileImage,
    role: serverRole,
    roomId,
    title,
    token,
    username,
}: LiveStreamContextProviderProps) {
    const huddle = useHuddleJoinRoom({ roomId, token });

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
            roomId,
            permissions,
            title,
            participants,
            profileImage,
            serverRole,
            token,
            username,
            huddleRole: huddle.role as string,
        }),
        [roomId, permissions, title, participants, profileImage, serverRole, token, username, huddle.role],
    );

    return <LiveStreamContext.Provider value={value}>{children}</LiveStreamContext.Provider>;
}
