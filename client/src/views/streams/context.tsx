import { useLocalAudio, useLocalPeer, useLocalVideo, usePeerIds, useRoom } from "@huddle01/react";
import React from "react";
import { useScreenSharing } from "./hooks";

interface iStreamingUIContext {
    isHost: boolean;
    isGuest: boolean;
    isCoHost: boolean;
    isListener: boolean;
    viewerCount: number;
    permissions: iStreamingUIPermissions;
    screenSharerPeerId: string | null;
    isSomeoneSharingTheirScreen: boolean;
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
    const { isAudioOn, enableAudio } = useLocalAudio();

    const { state } = useRoom();

    const { isSomeoneSharingTheirScreen, screenSharerPeerId } = useScreenSharing();

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
    const isGuest = typedRole === "guest";
    const isCoHost = typedRole === "coHost";
    const isListener = typedRole === "listener";
    const viewerCount = peerIds.length;

    React.useEffect(
        function () {
            (async function () {
                if (isHost && state === "connected" && !isVideoOn && !isAudioOn) {
                    await enableVideo().catch((error) => console.error("Error enabling video:", error));
                    await enableAudio().catch((error) => console.error("Error enabling audio:", error));
                }
            })();
        },
        [typedRole, isVideoOn, state],
    );

    // const value: iStreamingUIContext = React.useMemo(() => ({}), []);
    const value: iStreamingUIContext = React.useMemo(
        () => ({
            isHost,
            isGuest,
            isCoHost,
            isListener,
            viewerCount,
            permissions,
            isSomeoneSharingTheirScreen,
            screenSharerPeerId,
        }),
        [isHost, isGuest, isCoHost, isListener, viewerCount, permissions],
    );

    return <StreamingUIContext.Provider value={value}>{children}</StreamingUIContext.Provider>;
}

export function useStreamingUIPermissions() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);
    return context.permissions;
}
