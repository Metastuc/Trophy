import { useRemoteAudio, useRemoteScreenShare, useRemoteVideo } from "@huddle01/react/hooks";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";

export function StreamerRemote({ peerId }: { peerId: string }) {
    const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });
    const { stream: videoStream, state: videoStreamState } = useRemoteVideo({ peerId });
    const { videoStream: screenVideo, audioStream: screenAudio } = useRemoteScreenShare({ peerId });

    return (
        <StreamerVideoTile
            audioStream={audioStream}
            audioStreamState={audioState}
            screenAudio={screenAudio}
            screenVideo={screenVideo}
            videoStream={videoStream}
            videoStreamState={videoStreamState}
        />
    );
}
