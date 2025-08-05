import { useRemoteAudio, useRemoteScreenShare, useRemoteVideo } from "@huddle01/react/hooks";
import React from "react";

import { StreamerVideoTile } from "@/components/ui/streamer-video-tile";

import { useStreamingUIContext } from "../context";

export function StreamerRemote({ peerId }: { peerId: string }) {
    const { screenSharing, setScreenSharing } = useStreamingUIContext();

    const { stream: audioStream, state: audioState } = useRemoteAudio({ peerId });
    const { stream: videoStream, state: videoStreamState } = useRemoteVideo({ peerId });
    const { videoStream: screenVideo, audioStream: screenAudio, state: screenState } = useRemoteScreenShare({ peerId });

    const isSharingScreen = !!screenVideo && screenState === "playable";

    React.useEffect(() => {
        if (isSharingScreen) {
            if (!screenSharing.someoneIsSharingTheirScreen) {
                setScreenSharing({
                    someoneIsSharingTheirScreen: true,
                    whoIsSharingTheirScreen: peerId,
                });
            }
        } else {
            if (screenSharing.whoIsSharingTheirScreen === peerId) {
                setScreenSharing({
                    someoneIsSharingTheirScreen: false,
                    whoIsSharingTheirScreen: null,
                });
            }
        }
    }, [
        isSharingScreen,
        peerId,
        screenSharing.someoneIsSharingTheirScreen,
        screenSharing.whoIsSharingTheirScreen,
        setScreenSharing,
    ]);

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
