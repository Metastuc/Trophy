import { usePeerIds, useRemoteScreenShare } from "@huddle01/react";

export function useScreenSharing() {
    const { peerIds } = usePeerIds({ roles: ["host", "cohost"] });
    const peer1 = peerIds[0];
    const peer2 = peerIds[1];
    const peer3 = peerIds[2];
    const peer4 = peerIds[3];
    const peer5 = peerIds[4];

    const peerMap = [
        { peerId: peer1, ...useRemoteScreenShare({ peerId: peer1 }) },
        { peerId: peer2, ...useRemoteScreenShare({ peerId: peer2 }) },
        { peerId: peer3, ...useRemoteScreenShare({ peerId: peer3 }) },
        { peerId: peer4, ...useRemoteScreenShare({ peerId: peer4 }) },
        { peerId: peer5, ...useRemoteScreenShare({ peerId: peer5 }) },
    ].filter(Boolean);

    const whatPeerIsPresentlySharing = peerMap.find(({ videoStream, state }) => videoStream && state === "playable");

    return {
        isSomeoneSharingTheirScreen: !!whatPeerIsPresentlySharing?.peerId,
        screenSharerPeerId: whatPeerIsPresentlySharing?.peerId || null,
    };
}
