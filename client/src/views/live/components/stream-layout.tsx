import { useLocalAudio, useLocalPeer, useLocalScreenShare, useLocalVideo, usePeerIds } from "@huddle01/react";
import { useEffect } from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { cn } from "@/lib/utils";
import { logger } from "@/utils/logger";

import { useStreamingUIRoles, useStreamingUIScreenShare } from "../hooks";
import { getStreamLayoutKey } from "../utils";
import { StreamThumbnailCapture } from "./stream-thumbnails";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { peerId: localPeerId } = useLocalPeer();
    const { peerIds: coHostPeerIds } = usePeerIds({ roles: ["coHost"] });
    const { peerIds: hostPeerIds } = usePeerIds({ roles: ["host"] });
    const { shareStream } = useLocalScreenShare();

    const { coHost } = useStreamingUIRoles();
    const { screenSharing } = useStreamingUIScreenShare();

    const hostPeerId = hostPeerIds[0];
    const allCoHostsPeerIds = coHost ? [...coHostPeerIds, localPeerId] : coHostPeerIds;

    const streamLayoutKey = getStreamLayoutKey({
        coHostCount: allCoHostsPeerIds.length,
        isScreenSharing: screenSharing.someoneIsSharingTheirScreen,
    });

    logger({
        streamLayoutKey,
        coHostPeerIds,
        isScreenSharing: screenSharing.someoneIsSharingTheirScreen,
        whoIsSharing: screenSharing.whoIsSharingTheirScreen,
        hostPeerId,
        allCoHostsPeerIds,
        localPeerId,
        shareStream: !!shareStream,
    });

    return (
        <div className={cn("size-full", streamLayoutKey)} id="stream-layout">
            <RenderStreamers role="host" />
            <RenderStreamers role="coHost" />
            <StreamThumbnailCapture />
        </div>
    );
}

function RenderStreamers({ role }: { role: tRole }) {
    const { peerId: localPeerId } = useLocalPeer();
    const { peerIds } = usePeerIds({ roles: [role] });
    const { shareStream } = useLocalScreenShare();
    const { stream: localAudio, isAudioOn } = useLocalAudio();
    const { stream: localStream, isVideoOn } = useLocalVideo();

    const { coHost, host } = useStreamingUIRoles();
    const { screenShareGuard } = useStreamingUIScreenShare();

    const isLocal = (role === "host" && host) || (role === "coHost" && coHost);
    const tileClass = role === "host" ? "host-tile" : "coHost-tile";
    const peersWithRole = isLocal ? [localPeerId, ...peerIds] : peerIds;
    const sorted = [...peersWithRole].sort(function (a, b) {
        if (a === null || b === null) return 0;
        return a.localeCompare(b);
    });

    useEffect(
        function () {
            if (!localPeerId) return;

            screenShareGuard({
                peerIsSharing: !!shareStream,
                whoIsSharing: localPeerId as string,
            });
        },
        [shareStream, localPeerId, screenShareGuard],
    );

    return sorted.map((peerId, index) =>
        peerId && peerId === localPeerId ? (
            <StreamerVideoTile
                key={peerId}
                videoStream={localStream}
                videoStreamState={isVideoOn ? "playable" : "unavailable"}
                audioStream={localAudio}
                audioStreamState={isAudioOn ? "playable" : "unavailable"}
                screenVideo={shareStream || null}
                tileClass={`${tileClass}-${index + 1}`}
                isLocal={isLocal}
            />
        ) : (
            peerId && (
                <StreamerRemote
                    peerId={peerId}
                    key={peerId}
                    tileClass={`${tileClass}-${index + 1}`}
                    isLocal={isLocal}
                />
            )
        ),
    );
}
