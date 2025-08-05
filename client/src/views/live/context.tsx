import { useLocalPeer, useLocalVideo, usePeerIds, useRoom } from "@huddle01/react";
import React from "react";

import { logger } from "@/utils/logger";

export const StreamingUIContext: React.Context<iStreamingUIContext> = React.createContext<iStreamingUIContext>(
    {} as iStreamingUIContext,
);

export function useStreamingUIContext() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);

    if (context === undefined || context === null || !context)
        throw new Error("useStreamingUIContext must be used within a StreamingUIContextProvider");

    return context;
}

export function StreamingUIContextProvider({ children }: { children: React.ReactNode }) {
    const { isVideoOn, enableVideo } = useLocalVideo();
    const { peerIds } = usePeerIds();
    const { role } = useLocalPeer();
    const { state } = useRoom();

    const typedRole: tRole = role as tRole;

    const [userHasToggled, setUserHasToggled] = React.useState<tUserHasToggled>(() => ({
        audio: false,
        video: false,
    }));

    const [screenSharing, setScreenSharing] = React.useState<tScreenSharing>(() => ({
        someoneIsSharingTheirScreen: false,
        whoIsSharingTheirScreen: null,
    }));

    const permissions: iStreamingUIPermissions = React.useMemo(
        () => ({
            canEndStream: typedRole === "host",
            canInvite: typedRole === "host",
            canShareScreen: typedRole === "host" || typedRole === "coHost",
            canToggleAudio: typedRole === "host" || typedRole === "coHost",
            canToggleChat: typedRole === "host",
            canToggleVideo: typedRole === "host" || typedRole === "coHost",
        }),
        [typedRole],
    );

    const roomRoles: iRoomRoles = React.useMemo(
        () => ({
            bot: typedRole === "bot",
            coHost: typedRole === "coHost",
            guest: typedRole === "guest",
            host: typedRole === "host",
            listener: typedRole === "listener",
            speaker: typedRole === "speaker",
        }),
        [typedRole],
    );

    const viewerCount = peerIds.length;

    logger({ peerIds });

    React.useEffect(
        function () {
            (async function () {
                if (roomRoles.host && state === "connected" && !isVideoOn && !userHasToggled.video) {
                    await enableVideo().catch((error) => console.error("Error enabling video:", error));
                }
            })();
        },
        [typedRole, isVideoOn, state],
    );

    React.useEffect(
        function () {
            if (["closed", "left", "failed"].includes(state)) {
                setUserHasToggled({ audio: false, video: false });
            }
        },
        [state],
    );

    const value: iStreamingUIContext = React.useMemo(
        () => ({
            permissions,
            roomRoles,
            setUserHasToggled,
            screenSharing,
            setScreenSharing,
            viewerCount,
        }),
        [permissions, viewerCount, setUserHasToggled, roomRoles, setScreenSharing, screenSharing],
    );

    return <StreamingUIContext.Provider value={value}>{children}</StreamingUIContext.Provider>;
}
