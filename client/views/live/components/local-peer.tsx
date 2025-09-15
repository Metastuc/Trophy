import { useLocalAudio, useLocalScreenShare, useLocalVideo } from "@huddle01/react";

import { LiveStreamMedia } from "./media";

interface LiveStreamLocalPeerProps {
    isLocal?: boolean;
    tileClass?: string;
}

export function LiveStreamLocalPeer({ isLocal, tileClass }: LiveStreamLocalPeerProps) {
    const { stream: audioStream, isAudioOn } = useLocalAudio();
    const { stream: videoStream, isVideoOn } = useLocalVideo();
    const { shareStream } = useLocalScreenShare();

    return (
        <LiveStreamMedia
            audioStream={audioStream}
            audioStreamState={isAudioOn ? "playable" : "unavailable"}
            screenVideo={shareStream || undefined}
            videoStream={videoStream}
            videoStreamState={isVideoOn ? "playable" : "unavailable"}
            tileClass={tileClass}
            isLocal={isLocal}
        />
    );
}
