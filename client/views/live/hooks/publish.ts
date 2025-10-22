import { useLocalAudio, useLocalVideo, useRoom } from "@huddle01/react/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

export function useHuddleHostPublish(role: JoinStreamData["role"]) {
    const { isVideoOn, enableVideo } = useLocalVideo();
    const { isAudioOn, enableAudio } = useLocalAudio();
    const { state } = useRoom();

    useEffect(
        function () {
            if (role !== "host" || state !== "connected") return;

            Promise.all([
                !isVideoOn ? enableVideo({ prefferedCodec: "video/vp8" }) : Promise.resolve(),
                !isAudioOn ? enableAudio({ prefferedCodec: "audio/opus" }) : Promise.resolve(),
            ]).catch(function (error) {
                toast.error((error as Error).message);
            });
        },
        [role, state, isVideoOn, isAudioOn, enableVideo, enableAudio],
    );
}
