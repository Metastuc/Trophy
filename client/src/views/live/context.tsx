import { useLocalPeer, useLocalVideo, usePeerIds, useRoom } from "@huddle01/react";
import { usePrevious } from "@uidotdev/usehooks";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { useAuthenticationStore } from "@/store/authentication";
import { logger } from "@/utils/logger";

import { StreamingUIContext } from "./hooks";

interface iStreamingUIContextProvider extends PropsWithChildren {
    roomId: string;
    token: string;
}

export function StreamingUIContextProvider({ children, roomId, token }: iStreamingUIContextProvider) {
    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);
    const previousIsAuthenticated = usePrevious(isAuthenticated);

    const { isVideoOn, enableVideo } = useLocalVideo({
        onProduceClose(reason) {
            console.log("Video stream closed:", reason);
        },
    });
    const { joinRoom, state, leaveRoom } = useRoom();
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

    const roomConnectionRefs = useRef({
        peerHasJoined: false,
        peerIsJustJoining: true,
        peerWasConnected: false,
    });

    useEffect(
        /**
         * join the room
         */
        function () {
            logger("Room state changed:", state);

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
        /**
         * enable video on connect if host
         */
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
            // console.log("fourth useEffect");
            // debug();

            if (["closed", "left", "failed"].includes(state)) {
                setUserHasToggled({ audio: false, video: false });
            }
        },
        [state],
    );

    const value: iStreamingUIContext = useMemo(
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

    function debug() {
        console.log("streaming UI context re-render");
        logger({
            isAuthenticated,
            permissions,
            previousIsAuthenticated,
            roomConnectionRefs: roomConnectionRefs.current,
            roomRoles,
            screenSharing,
            state,
            token,
            typedRole,
            userHasToggled,
            viewerCount,
        });
    }

    return <StreamingUIContext.Provider value={value}>{children}</StreamingUIContext.Provider>;
}
