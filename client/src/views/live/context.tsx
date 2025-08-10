import { useLocalPeer, useLocalVideo, usePeerIds, useRoom } from "@huddle01/react";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useAuthenticationStore } from "@/store/authentication";

import { StreamingUIContext } from "./hooks";

interface iStreamingUIContextProvider extends PropsWithChildren {
    roomId: string;
    token: string;
}

export function StreamingUIContextProvider({ children, roomId, token }: iStreamingUIContextProvider) {
    const authenticationStore = useAuthenticationStore((state) => state);

    const { isVideoOn, enableVideo } = useLocalVideo();
    const { role, updateMetadata, peerId } = useLocalPeer();
    const { peerIds } = usePeerIds();
    const { joinRoom, state } = useRoom({
        onJoin() {
            updateMetadata({
                username: authenticationStore.user?.backendUserData.user.username ?? "anon",
                userPFP: authenticationStore.user?.backendUserData.user.profilePicture ?? "",
                userPeerID: peerId,
            });
        },
    });

    const typedRole: tRole = role as tRole;

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
        [enableVideo, isVideoOn, roomRoles, state, userHasToggled.video],
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
            allPeers: peerIds,
            isCoHostDrawerOpen,
            permissions,
            roomRoles,
            screenSharing,
            setIsCoHostDrawerOpen,
            setScreenSharing,
            setUserHasToggled,
            viewerCount: peerIds.length,
        }),
        [
            isCoHostDrawerOpen,
            peerIds,
            permissions,
            roomRoles,
            screenSharing,
            setIsCoHostDrawerOpen,
            setScreenSharing,
            setUserHasToggled,
        ],
    );

    return <StreamingUIContext.Provider value={value}>{children}</StreamingUIContext.Provider>;
}
