import { useLocalPeer, useLocalVideo, usePeerIds, useRoom } from "@huddle01/react";
import React from "react";

import { useScreenSharing } from "./hooks";

interface iStreamingUIContext {
    isHost: boolean;
    isCoHost: boolean;
    isListener: boolean;
    viewerCount: number;
    permissions: iStreamingUIPermissions;
    screenSharerPeerId: string | null;
    isSomeoneSharingTheirScreen: boolean;
    setUserHasToggled: React.Dispatch<React.SetStateAction<{ audio: boolean; video: boolean }>>;
}

export const StreamingUIContext: React.Context<iStreamingUIContext> = React.createContext<iStreamingUIContext>(
    {} as iStreamingUIContext,
);

// export const StreamingUIContext = React.createContext(null);

export function useStreamingUIContext() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);
    // const context = React.useContext(StreamingUIContext);

    if (context === undefined || context === null || !context)
        throw new Error("useStreamingUIContext must be used within a StreamingUIContextProvider");

    return context;
}

export function StreamingUIContextProvider({ children }: { children: React.ReactNode }) {
    const { role } = useLocalPeer();
    const { peerIds } = usePeerIds();
    const { isVideoOn, enableVideo } = useLocalVideo();
    // const { isAudioOn, enableAudio } = useLocalAudio();

    const { state } = useRoom();

    const { isSomeoneSharingTheirScreen, screenSharerPeerId } = useScreenSharing();
    const [userHasToggled, setUserHasToggled] = React.useState(() => ({
        audio: false,
        video: false,
    }));

    const typedRole: tRole = role as tRole;
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

    const isHost = typedRole === "host";
    const isCoHost = typedRole === "coHost";
    const isListener = typedRole === "listener";
    const viewerCount = peerIds.length;

    React.useEffect(
        function () {
            (async function () {
                if (isHost && state === "connected") {
                    if (!isVideoOn && !userHasToggled.video) {
                        await enableVideo().catch((error) => console.error("Error enabling video:", error));
                    }
                }
            })();
        },
        [typedRole, isVideoOn, state],
    );

    React.useEffect(
        function () {
            if (state === "closed" || state === "left" || state === "failed") {
                setUserHasToggled({ audio: false, video: false });
            }
        },
        [state],
    );

    const value: iStreamingUIContext = React.useMemo(
        () => ({
            isCoHost,
            isHost,
            isListener,
            isSomeoneSharingTheirScreen,
            permissions,
            screenSharerPeerId,
            viewerCount,
            setUserHasToggled,
        }),
        [
            isCoHost,
            isHost,
            isListener,
            isSomeoneSharingTheirScreen,
            permissions,
            screenSharerPeerId,
            viewerCount,
            setUserHasToggled,
        ],
    );

    return <StreamingUIContext.Provider value={value}>{children}</StreamingUIContext.Provider>;
}

export function useStreamingUIPermissions() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);
    return context.permissions;
}
