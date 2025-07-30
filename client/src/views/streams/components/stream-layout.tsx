import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { logger } from "@/utils/logger";
import { useLocalPeer, useLocalVideo, usePeerIds } from "@huddle01/react";
import { useStreamingUIContext } from "../context";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { peerIds } = usePeerIds();
    const { role } = useLocalPeer();
    const { isCoHost, isHost, viewerCount } = useStreamingUIContext();

    logger({ peerIds });

    return <HostOnly />;

    switch (true) {
        case isHost && peerIds.length === 0:
            return <HostOnly />;

        default:
            return <></>;
    }
}

function HostOnly() {
    const { isHost } = useStreamingUIContext();
    const { peerIds: hostId } = usePeerIds({ roles: ["host"] });
    const { stream: localStream, isVideoOn: localVideoOn } = useLocalVideo();

    if (isHost) {
        if (localVideoOn && localStream) {
            return <StreamerVideoTile stream={localStream} />;
        }
        return <>Your video is off</>;
    }

    return (
        <div>
            {hostId.map((value, index) => (
                <StreamerRemote peerId={value} key={index} />
            ))}
        </div>
    );
}

function HostOnlyWithScreenShare() {}

function HostWithOneCoHost() {}

function HostWithScreenShareAndOneCoHost() {}

function HostWithTwoCoHosts() {}

function HostWithScreenShareAndTwoCoHosts() {}

function HostWithThreeCoHosts() {}

function HostWithScreenShareAndThreeCoHosts() {}

function HostWithFourCoHosts() {}

function HostWithScreenShareAndFourCoHosts() {}
