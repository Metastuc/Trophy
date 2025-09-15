import { useRemoteAudio, useRemoteScreenShare, useRemoteVideo } from "@huddle01/react";

import { LiveStreamMedia } from "./media";

interface LiveStreamRemotePeerProps {
    peerId: string;
    tileClass?: string;
    isLocal?: boolean;
}

export function LiveStreamRemotePeer({ peerId, tileClass, isLocal }: LiveStreamRemotePeerProps) {
    const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });
    const { stream: videoStream, state: videoStreamState } = useRemoteVideo({ peerId });
    const { videoStream: screenVideo, audioStream: screenAudio } = useRemoteScreenShare({ peerId });

    return (
        <LiveStreamMedia
            audioStream={audioStream}
            audioStreamState={audioState}
            screenAudio={screenAudio}
            screenVideo={screenVideo}
            videoStream={videoStream}
            videoStreamState={videoStreamState}
            tileClass={tileClass}
            isLocal={isLocal}
        />
    );
}
