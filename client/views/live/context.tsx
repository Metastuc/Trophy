import { PropsWithChildren, useMemo } from "react";

import { LiveStreamContext } from "./hooks";
import { useHuddleJoinRoom } from "./hooks/huddle";

interface LiveStreamContextProviderProps extends PropsWithChildren {
    title: string;
    roomId: string;
    participants: {
        id: string;
        role: string;
    };
    profileImage: string;
    role: "host" | "guest" | "listener";
    token: string;
    username: string;
}

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
    console.log(title, roomId, participants, profileImage, serverRole, token, username);
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

    const value = useMemo(() => ({ roomId, permissions }), [roomId, permissions]);

    return <LiveStreamContext.Provider value={value}>{children}</LiveStreamContext.Provider>;
}
