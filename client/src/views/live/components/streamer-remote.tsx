import { useRemoteAudio, useRemoteScreenShare, useRemoteVideo } from "@huddle01/react/hooks";
import { useEffect } from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";

import { useStreamingUIScreenShare } from "../hooks";

export function StreamerRemote({ peerId, tileClass }: { peerId: string; tileClass?: string }) {
    const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });
    const { stream: videoStream, state: videoStreamState } = useRemoteVideo({ peerId });
    const { videoStream: screenVideo, audioStream: screenAudio } = useRemoteScreenShare({ peerId });

    const { screenShareGuard } = useStreamingUIScreenShare();

    useEffect(
        function () {
            if (!peerId) return;

            screenShareGuard({
                peerIsSharing: !!screenVideo,
                whoIsSharing: peerId,
            });
        },
        [peerId, screenVideo, screenShareGuard],
    );

    return (
        <StreamerVideoTile
            audioStream={audioStream}
            audioStreamState={audioState}
            screenAudio={screenAudio}
            screenVideo={screenVideo}
            videoStream={videoStream}
            videoStreamState={videoStreamState}
            tileClass={tileClass}
        />
    );
}
