import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface iStreamerIndicator {
    isCamOn: boolean;
    isMicOn: boolean;
    username: string;
}

export function StreamerIndicator({ isCamOn, isMicOn, username }: iStreamerIndicator) {
    return (
        <div>
            <i>{isMicOn ? <Mic /> : <MicOff />}</i>
            <i>{isCamOn ? <Video /> : <VideoOff />}</i>
            <span>@{username}</span>
        </div>
    );
}
