import { useLocalAudio, useLocalScreenShare, useLocalVideo } from "@huddle01/react";

import { LiveStreamMedia } from "./media";

export function LiveStreamLocalPeer({ isLocal, tileClass }: { isLocal?: boolean; tileClass?: string }) {
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
