import { useLocalPeer, useLocalVideo, usePeerIds, useRoom } from "@huddle01/react";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useAuthenticationStore } from "@/store/authentication";

import { StreamingUIContext } from "./hooks";
import { useCoHostInvitationHandler } from "./hooks/co-hosts";
import { useScreenShareSync } from "./hooks/screen-share";

interface iStreamingUIContextProvider extends PropsWithChildren {
    roomId: string;
    token: string;
}

export function StreamingUIContextProvider({ children, roomId, token }: iStreamingUIContextProvider) {
    const authenticationStore = useAuthenticationStore((state) => state);

    const { isVideoOn, enableVideo } = useLocalVideo();
    const { role, updateMetadata, peerId } = useLocalPeer();
    const { peerIds } = usePeerIds();
    const { joinRoom, state } = useRoom();

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

    const screenShareHandler = useScreenShareSync({ peerIds });

    const [isCoHostDrawerOpen, setIsCoHostDrawerOpen] = useState<boolean>(false);
    const coHostInvitationHandler: iCoHostInvitationHandler = useCoHostInvitationHandler(roomRoles);

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
            if (state === "connected" && peerId) {
                updateMetadata({
                    username: authenticationStore.user?.backendUserData.user.username ?? "anon",
                    userPFP: authenticationStore.user?.backendUserData.user.profilePicture ?? "",
                    userPeerID: peerId,
                });
            }
        },
        [
            authenticationStore.user?.backendUserData.user.profilePicture,
            authenticationStore.user?.backendUserData.user.username,
            peerId,
            peerIds,
            state,
            updateMetadata,
        ],
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

                // screenShareHandler.setScreenSharing({
                //     someoneIsSharingTheirScreen: false,
                //     whoIsSharingTheirScreen: null,
                // });
            }
        },
        [state, screenShareHandler],
    );

    const value: iStreamingUIContext = useMemo(
        () => ({
            allPeers: peerIds,
            coHostInvitationHandler,
            isCoHostDrawerOpen,
            permissions,
            roomRoles,
            screenShareHandler,
            setIsCoHostDrawerOpen,
            setUserHasToggled,
            viewerCount: peerIds.length,
        }),
        [
            coHostInvitationHandler,
            isCoHostDrawerOpen,
            peerIds,
            permissions,
            roomRoles,
            screenShareHandler,
            setIsCoHostDrawerOpen,
            setUserHasToggled,
        ],
    );

    return <StreamingUIContext.Provider value={value}>{children}</StreamingUIContext.Provider>;
}
