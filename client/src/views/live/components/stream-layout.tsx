import { useLocalAudio, useLocalPeer, useLocalScreenShare, useLocalVideo, usePeerIds } from "@huddle01/react";
import { Fragment, useEffect } from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { cn } from "@/lib/utils";
import { logger } from "@/utils/logger";

import { useStreamingUIRoles, useStreamingUIScreenShare } from "../hooks";
import { getStreamLayoutKey } from "../utils";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { peerId } = useLocalPeer();
    const { peerIds: coHostPeerIds } = usePeerIds({ roles: ["coHost"] });
    const { shareStream } = useLocalScreenShare();

    const { coHost } = useStreamingUIRoles();
    const { screenSharing, sendScreenShareMessage, setScreenSharing } = useStreamingUIScreenShare();

    const streamLayoutKey = getStreamLayoutKey({
        coHostCount: coHost ? coHostPeerIds.length + 1 : coHostPeerIds.length,
        isScreenSharing: screenSharing.someoneIsSharingTheirScreen,
    });

    logger({
        streamLayoutKey,
        coHostPeerIds,
        isScreenSharing: screenSharing.someoneIsSharingTheirScreen,
        whoIsSharing: screenSharing.whoIsSharingTheirScreen,
    });

    useEffect(
        function () {
            if (shareStream) {
                setScreenSharing({
                    someoneIsSharingTheirScreen: true,
                    whoIsSharingTheirScreen: peerId,
                });
                sendScreenShareMessage("start");
            } else {
                setScreenSharing({
                    someoneIsSharingTheirScreen: false,
                    whoIsSharingTheirScreen: null,
                });
                sendScreenShareMessage("stop");
            }
        },
        [shareStream, setScreenSharing, sendScreenShareMessage, peerId],
    );

    return (
        <div
            // className={cn(
            //     "grid size-full",
            //     screenSharing.someoneIsSharingTheirScreen && "grid-row-3 streamer-grid grid-cols-8",
            // )}

            className={cn("size-full", streamLayoutKey)}
        >
            <RenderStreamers role="host" />
            <RenderStreamers role="coHost" />
        </div>
    );
}

function RenderStreamers({ role }: { role: tRole }) {
    const { peerIds } = usePeerIds({ roles: [role] });
    const { stream: localStream, isVideoOn } = useLocalVideo();
    const { stream: localAudio, isAudioOn } = useLocalAudio();
    const { shareStream } = useLocalScreenShare();

    const { coHost, host } = useStreamingUIRoles();

    const isLocal = (role === "host" && host) || (role === "coHost" && coHost);
    const shouldShowLocal = isLocal && ((isVideoOn && localStream) || shareStream);
    const tileClass = role === "host" ? "host-tile" : "coHost-tile";

    return (
        <Fragment>
            {shouldShowLocal ? (
                <StreamerVideoTile
                    videoStream={localStream}
                    videoStreamState={isVideoOn ? "playable" : "unavailable"}
                    audioStream={localAudio}
                    audioStreamState={isAudioOn ? "playable" : "unavailable"}
                    screenVideo={shareStream || null}
                    tileClass={tileClass}
                />
            ) : null}

            {peerIds.map((peerId, index) =>
                peerId ? <StreamerRemote peerId={peerId} key={peerId} tileClass={`${tileClass}-${index + 1}`} /> : null,
            )}
        </Fragment>
    );
}
