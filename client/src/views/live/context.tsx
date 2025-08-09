import { useLocalPeer, useLocalVideo, usePeerIds, useRoom } from "@huddle01/react";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { StreamingUIContext } from "./hooks";

interface iStreamingUIContextProvider extends PropsWithChildren {
    roomId: string;
    token: string;
}

export function StreamingUIContextProvider({ children, roomId, token }: iStreamingUIContextProvider) {
    const { isVideoOn, enableVideo } = useLocalVideo();
    const { joinRoom, state } = useRoom();
    const { peerIds } = usePeerIds();
    const { role } = useLocalPeer();

    const typedRole: tRole = role as tRole;
    const viewerCount = peerIds.length;

    const permissions: iStreamingUIPermissions = useMemo(
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

    const roomRoles: iRoomRoles = useMemo(
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

    const [userHasToggled, setUserHasToggled] = useState<tUserHasToggled>(() => ({
        audio: false,
        video: false,
    }));

    const [screenSharing, setScreenSharing] = useState<tScreenSharing>(() => ({
        someoneIsSharingTheirScreen: false,
        whoIsSharingTheirScreen: null,
    }));

    const [isCoHostDrawerOpen, setIsCoHostDrawerOpen] = useState<boolean>(false);

    useEffect(
        function () {
            if (state === "idle") {
                console.log("[intial] Joining room...");

                joinRoom({ roomId, token }).catch((error) => {
                    toast.error((error as Error).message);
                });
            }
        },
        [joinRoom, roomId, state, token],
    );

    useEffect(
        function () {
            if (roomRoles.host && state === "connected" && !isVideoOn && !userHasToggled.video) {
                enableVideo().catch((error) => {
                    toast.error((error as Error).message);
                });
            }
        },
        [enableVideo, isVideoOn, roomRoles, state, userHasToggled],
    );

    useEffect(
        function () {
            if (["closed", "left", "failed"].includes(state)) {
                setUserHasToggled({ audio: false, video: false });
            }
        },
        [state],
    );

    const value: iStreamingUIContext = useMemo(
        () => ({
            isCoHostDrawerOpen,
            permissions,
            roomRoles,
            screenSharing,
            setIsCoHostDrawerOpen,
            setScreenSharing,
            setUserHasToggled,
            viewerCount,
        }),
        [
            isCoHostDrawerOpen,
            permissions,
            roomRoles,
            screenSharing,
            setIsCoHostDrawerOpen,
            setScreenSharing,
            setUserHasToggled,
            viewerCount,
        ],
    );

    return <StreamingUIContext.Provider value={value}>{children}</StreamingUIContext.Provider>;
}
