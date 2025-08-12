import { useLocalAudio, useLocalPeer, useLocalScreenShare, useLocalVideo, usePeerIds } from "@huddle01/react";
import { Fragment, useEffect } from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { cn } from "@/lib/utils";
import { logger } from "@/utils/logger";

import { useStreamingUIRoles, useStreamingUIScreenShare } from "../hooks";
import { getStreamLayoutKey } from "../utils";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { peerId: localPeerId } = useLocalPeer();
    const { peerIds: coHostPeerIds } = usePeerIds({ roles: ["coHost"] });
    const { peerIds: hostPeerIds } = usePeerIds({ roles: ["host"] });
    const { shareStream } = useLocalScreenShare();

    const { coHost, host } = useStreamingUIRoles();
    const { screenSharing, sendScreenShareMessage, setScreenSharing } = useStreamingUIScreenShare();

    const hostPeerId = hostPeerIds[0];
    const allCoHostsPeerIds = coHost ? [...coHostPeerIds, localPeerId] : coHostPeerIds;
    allCoHostsPeerIds.sort(function (a, b) {
        if (a === null || b === null) return 0;
        return a.localeCompare(b);
    });

    // const previousShareStream = usePrevious(shareStream);
    // const shareStreamRef = useRef(shareStream);

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

    useEffect(
        function () {
            if (!(host || coHost)) return;
            logger("[StreamLayout] host or coHost");

            // if (shareStream !== shareStreamRef.current) {
            //     logger("[StreamLayout] shareStream");
            //     sendScreenShareMessage(shareStream ? "start" : "stop");
            //     shareStreamRef.current = shareStream;

            //     // setScreenSharing({
            //     //     someoneIsSharingTheirScreen: true,
            //     //     whoIsSharingTheirScreen: localPeerId,
            //     // });
            //     // sendScreenShareMessage("start");
            // }
            // //  else {
            // //     logger("[StreamLayout] !shareStream");

            // //     // setScreenSharing({
            // //     //     someoneIsSharingTheirScreen: false,
            // //     //     whoIsSharingTheirScreen: null,
            // //     // });
            // //     sendScreenShareMessage("stop");
            // // }
        },
        [coHost, host, shareStream, localPeerId, sendScreenShareMessage, setScreenSharing],
    );

    return (
        <div className={cn("size-full", streamLayoutKey)}>
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
    const tileClass = role === "host" ? "host-tile" : "coHost-tile";

    // logger({ role, isLocal });

    return (
        <Fragment>
            {isLocal ? (
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
