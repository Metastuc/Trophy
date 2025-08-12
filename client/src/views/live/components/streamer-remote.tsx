import { useRemoteAudio, useRemotePeer, useRemoteScreenShare, useRemoteVideo } from "@huddle01/react/hooks";
import { useEffect } from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";

import { useStreamingUIScreenShare } from "../hooks";

export function StreamerRemote({ peerId, tileClass }: { peerId: string; tileClass?: string }) {
    const { metadata } = useRemotePeer<tStreamUIMetadata>({ peerId });
    const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });
    const { stream: videoStream, state: videoStreamState } = useRemoteVideo({ peerId });
    const { videoStream: screenVideo, audioStream: screenAudio } = useRemoteScreenShare({ peerId });

    const { screenShareGuard } = useStreamingUIScreenShare();

    console.log(peerId, {
        meta: metadata?.isPeerSharingTheirScreen,
        hasScreen: !!screenVideo,
    });

    useEffect(
        function () {
            if (!peerId) return;

            const metaIsSharing = !!metadata?.isPeerSharingTheirScreen;
            const isSharingScreen = !!screenVideo;

            screenShareGuard({
                peerIsSharing: metaIsSharing || isSharingScreen,
                whoIsSharing: peerId,
            });
        },
        [peerId, screenVideo, screenShareGuard, metadata?.isPeerSharingTheirScreen],
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
