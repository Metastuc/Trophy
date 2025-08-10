import { useLocalAudio, useLocalScreenShare, useLocalVideo, usePeerIds } from "@huddle01/react";
import { Fragment, useEffect } from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";
import { cn } from "@/lib/utils";
import { logger } from "@/utils/logger";

import { useStreamingUIContext, useStreamingUIRoles } from "../hooks";
import { StreamerRemote } from "./streamer-remote";

export function StreamLayout() {
    const { screenSharing, setScreenSharing } = useStreamingUIContext();
    const { shareStream } = useLocalScreenShare();

    useEffect(() => {
        if (shareStream) setScreenSharing((previous) => ({ ...previous, someoneIsSharingTheirScreen: true }));
        else setScreenSharing((previous) => ({ ...previous, someoneIsSharingTheirScreen: false }));
    }, [shareStream, setScreenSharing]);

    return (
        <div
            className={cn(
                "grid size-full",
                screenSharing.someoneIsSharingTheirScreen && "grid-row-3 streamer-grid grid-cols-8",
            )}
        >
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

    logger({ peerIds, role });

    const shouldShowLocal = isLocal && ((isVideoOn && localStream) || shareStream);

    return (
        <Fragment>
            {shouldShowLocal ? (
                <StreamerVideoTile
                    videoStream={localStream}
                    videoStreamState={isVideoOn ? "playable" : "unavailable"}
                    audioStream={localAudio}
                    audioStreamState={isAudioOn ? "playable" : "unavailable"}
                    screenVideo={shareStream || null}
                />
            ) : null}

            {peerIds.map((value, index) => (value ? <StreamerRemote peerId={value} key={index} /> : null))}
        </Fragment>
    );
}
