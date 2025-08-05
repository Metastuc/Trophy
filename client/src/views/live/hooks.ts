import { usePeerIds, useRemoteScreenShare } from "@huddle01/react";
import React from "react";

import { logger } from "@/utils/logger";

import { StreamingUIContext } from "./context";

export function useScreenSharing() {
    const { peerIds } = usePeerIds({ roles: ["host", "cohost"] });
    const [peer1, peer2, peer3, peer4, peer5] = peerIds;

    logger({ peer1, peer2, peer3, peer4, peer5 });

    const peerMap = [
        { peerId: peer1, ...useRemoteScreenShare({ peerId: peer1 }) },
        { peerId: peer2, ...useRemoteScreenShare({ peerId: peer2 }) },
        { peerId: peer3, ...useRemoteScreenShare({ peerId: peer3 }) },
        { peerId: peer4, ...useRemoteScreenShare({ peerId: peer4 }) },
        { peerId: peer5, ...useRemoteScreenShare({ peerId: peer5 }) },
    ].filter(({ peerId }) => !!peerId);

    const whatPeerIsPresentlySharing = peerMap.find(({ videoStream, state }) => videoStream && state === "playable");

    logger({
        isSomeoneSharingTheirScreen: !!whatPeerIsPresentlySharing?.peerId,
        screenSharerPeerId: whatPeerIsPresentlySharing?.peerId || null,
    });

    return {
        isSomeoneSharingTheirScreen: !!whatPeerIsPresentlySharing?.peerId,
        screenSharerPeerId: whatPeerIsPresentlySharing?.peerId || null,
    };
}

// import React from "react";

// export function useScreenSharing() {
//     const [screenSharing, setScreenSharing] = React.useState(() => ({
//         someoneIsSharingTheirScreen: false,
//         whoIsSharingTheirScreen: null,
//     }));
// }

export function useStreamingUIPermissions() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);
    return context.permissions;
}

export function useStreamingUIRoles() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);
    return context.roomRoles;
}
