import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { useLocalVideo, usePeerIds } from "@huddle01/react";
import { useStreamingUIContext } from "../context";
import { getStreamLayoutKey } from "../utils";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { isSomeoneSharingTheirScreen } = useStreamingUIContext();
    const { peerIds: coHostIds } = usePeerIds({ roles: ["coHost"] });

    const totalNumberOfCoHosts = coHostIds.length;
    const currentLayout = getStreamLayoutKey({
        coHostCount: totalNumberOfCoHosts,
        isScreenSharing: isSomeoneSharingTheirScreen,
    });

    switch (currentLayout) {
        case "host-only":
            return <HostOnly />;
        case "host-only-with-screen":
            return <HostOnlyWithScreenShare />;
        case "host-with-one-co-host":
            return <HostWithOneCoHost />;
        case "host-with-one-co-host-with-screen":
            return <HostWithScreenShareAndOneCoHost />;
        case "host-with-two-co-hosts":
            return <HostWithTwoCoHosts />;
        case "host-with-two-co-hosts-with-screen":
            return <HostWithScreenShareAndTwoCoHosts />;
        case "host-with-three-co-hosts":
            return <HostWithThreeCoHosts />;
        case "host-with-three-co-hosts-with-screen":
            return <HostWithScreenShareAndThreeCoHosts />;
        case "host-with-four-co-hosts":
            return <HostWithFourCoHosts />;
        case "host-with-four-co-hosts-with-screen":
            return <HostWithScreenShareAndFourCoHosts />;
        default:
            return <>Unsupported layout</>;
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

function HostOnlyWithScreenShare() {
    return <></>;
}

function HostWithOneCoHost() {
    return <></>;
}

function HostWithScreenShareAndOneCoHost() {
    return <></>;
}

function HostWithTwoCoHosts() {
    return <></>;
}

function HostWithScreenShareAndTwoCoHosts() {
    return <></>;
}

function HostWithThreeCoHosts() {
    return <></>;
}

function HostWithScreenShareAndThreeCoHosts() {
    return <></>;
}

function HostWithFourCoHosts() {
    return <></>;
}

function HostWithScreenShareAndFourCoHosts() {
    return <></>;
}
