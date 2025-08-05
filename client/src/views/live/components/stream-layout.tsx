import { useLocalAudio, useLocalScreenShare, useLocalVideo, usePeerIds } from "@huddle01/react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";

import { cn } from "@/lib/utils";
import React from "react";
import { useStreamingUIContext } from "../context";
import { useStreamingUIRoles } from "../hooks";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { screenSharing } = useStreamingUIContext();
    const { peerIds: coHostIds } = usePeerIds({ roles: ["coHost"] });
    const { shareStream } = useLocalScreenShare();
    const isScreenSharing = screenSharing.someoneIsSharingTheirScreen || !!shareStream;

    return (
        <div className={cn("grid h-full", "streamer-grid", isScreenSharing && "grid-row-3 grid-cols-8")}>
            <RenderStreamers role="host" />
            <RenderStreamers role="coHost" />
            {/* <p className="aspect-video text-white">screen</p>
            <p className="aspect-video text-white">host</p>
            <p className="aspect-video text-white">co 1</p>
            <p className="aspect-video text-white">co 2</p>
            <p className="aspect-video text-white">co 3</p>
            <p className="aspect-video text-white">co 4</p> */}
            {/* <p className="aspect-video text-white"></p> */}
            {/* <p className="aspect-video text-white"></p> */}
        </div>
    );
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
