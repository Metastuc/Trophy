import { useLocalAudio, useLocalScreenShare, useLocalVideo, usePeerIds } from "@huddle01/react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";

import React from "react";
import { useStreamingUIContext } from "../context";
import { useStreamingUIRoles } from "../hooks";
import { getStreamLayoutKey } from "../utils";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { screenSharing } = useStreamingUIContext();
    const { peerIds: coHostIds } = usePeerIds({ roles: ["coHost"] });
    const { shareStream } = useLocalScreenShare();

    const totalNumberOfCoHosts = coHostIds.length;
    const currentLayout = getStreamLayoutKey({
        coHostCount: totalNumberOfCoHosts,
        isScreenSharing: screenSharing.someoneIsSharingTheirScreen || !!shareStream,
    });

    // logger({
    //     currentLayout,
    //     totalNumberOfCoHosts,
    //     isScreenSharing: screenSharing.someoneIsSharingTheirScreen || !!shareStream,
    // });

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
    return <RenderStreamers role="host" />;
}

function HostOnlyWithScreenShare() {
    let content: React.ReactNode;

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

function RenderStreamers({ role }: { role: tRole }) {
    const { coHost, host } = useStreamingUIRoles();
    const isLocal = (role === "host" && host) || (role === "coHost" && coHost);

    const { peerIds } = usePeerIds({ roles: [role] });
    const { stream: localStream, isVideoOn } = useLocalVideo();
    const { stream: localAudio, isAudioOn } = useLocalAudio();
    const { shareStream } = useLocalScreenShare();

    const shouldShowLocal = isLocal && ((isVideoOn && localStream) || shareStream);

    return (
        <React.Fragment>
            {shouldShowLocal ? (
                <StreamerVideoTile
                    videoStream={localStream}
                    videoStreamState={isVideoOn ? "playable" : "unavailable"}
                    audioStream={localAudio}
                    audioStreamState={isAudioOn ? "playable" : "unavailable"}
                    screenVideo={shareStream && shareStream}
                />
            ) : null}

            {peerIds.map((value, index) => (value ? <StreamerRemote peerId={value} key={index} /> : null))}
        </React.Fragment>
    );
}
