import { useLocalAudio, useLocalScreenShare, useLocalVideo, usePeerIds } from "@huddle01/react";
import React from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { cn } from "@/lib/utils";

import { useStreamingUIContext } from "../context";
import { useStreamingUIRoles } from "../hooks";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { screenSharing, setScreenSharing } = useStreamingUIContext();
    const { shareStream } = useLocalScreenShare();
    const isScreenSharing = screenSharing.someoneIsSharingTheirScreen || !!shareStream;

    React.useEffect(() => {
        if (isScreenSharing) setScreenSharing((previous) => ({ ...previous, someoneIsSharingTheirScreen: true }));
        else setScreenSharing((previous) => ({ ...previous, someoneIsSharingTheirScreen: false }));
    }, [isScreenSharing]);

    return (
        <div className={cn("grid size-full", "streamer-grid", isScreenSharing && "grid-row-3 grid-cols-8")}>
            <RenderStreamers role="host" />
            <RenderStreamers role="coHost" />
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
