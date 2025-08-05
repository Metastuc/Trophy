import { useLocalAudio, useLocalVideo, usePeerIds } from "@huddle01/react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";

import { useStreamingUIRoles } from "../hooks";
import { getStreamLayoutKey } from "../utils";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { peerIds: coHostIds } = usePeerIds({ roles: ["coHost"] });

    const totalNumberOfCoHosts = coHostIds.length;
    const currentLayout = getStreamLayoutKey({
        coHostCount: totalNumberOfCoHosts,
        isScreenSharing: false,
    });

    // logger({ currentLayout, isSomeoneSharingTheirScreen });

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
    let content: React.ReactNode;

    const { host } = useStreamingUIRoles();
    const { peerIds: hostId } = usePeerIds({ roles: ["host"] });

    const { stream: localStream, isVideoOn } = useLocalVideo();
    const { stream: localAudio, isAudioOn } = useLocalAudio();

    if (host) {
        if (isVideoOn && localStream) {
            content = (
                <StreamerVideoTile
                    videoStream={localStream}
                    videoStreamState={isVideoOn ? "playable" : "unavailable"}
                    audioStream={localAudio}
                    audioStreamState={isAudioOn ? "playable" : "unavailable"}
                />
            );
        } else {
            content = <span className="text-white">Your video is off</span>;
        }
    } else {
        content = hostId.map((value, index) => <StreamerRemote peerId={value} key={index} />);
    }

    return <div className="flex size-full items-center justify-center">{content}</div>;
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
