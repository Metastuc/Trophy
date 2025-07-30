import { cn } from "@/lib/utils";
import React from "react";

interface iStreamerVideoTile {
    stream: MediaStream;
    className?: string;
}

export function StreamerVideoTile({ stream, className }: iStreamerVideoTile) {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    React.useEffect(
        function () {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch((error) => {
                    console.error("Error playing video:", error);
                });
            }
        },
        [stream],
    );

    return <video autoPlay={true} className={cn(className, "size-full object-cover")} muted={true} ref={videoRef} />;
}
