import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { useLocalVideo, usePeerIds } from "@huddle01/react";
import { useStreamingUIContext } from "../context";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { isHost } = useStreamingUIContext();
    const { peerIds: coHostIds } = usePeerIds({ roles: ["cohost"] });
    const { peerIds: hostId } = usePeerIds({ roles: ["host"] });

    return <HostOnly />;
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
