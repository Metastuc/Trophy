import { Fragment, memo, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface LiveStreamMediaProps {
    videoStream?: MediaStream | null;
    videoStreamState?: "playable" | "unavailable" | "paused" | "available";

    audioStream?: MediaStream | null;
    audioStreamState?: "playable" | "unavailable" | "paused" | "available";

    screenVideo?: MediaStream | null;
    screenAudio?: MediaStream | null;

    tileClass?: string;
    isLocal?: boolean;
}

export const LiveStreamMedia = memo(function ({
    audioStream,
    audioStreamState,
    videoStream,
    videoStreamState,
    screenAudio,
    screenVideo,
    tileClass,
    isLocal,
}: LiveStreamMediaProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const screenVideoRef = useRef<HTMLVideoElement | null>(null);
    const screenAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(
        function () {
            if (videoStream && videoRef.current && videoStreamState === "playable") {
                videoRef.current.srcObject = videoStream;

                videoRef.current.onloadedmetadata = async function () {
                    try {
                        videoRef.current?.play();
                    } catch (error) {
                        console.error(error);
                    }
                };

                videoRef.current.onerror = function () {
                    console.error("Error occurred while playing video stream.");
                };
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [videoStream],
    );

    useEffect(
        function () {
            if (audioStream && audioRef.current && audioStreamState === "playable") {
                audioRef.current.srcObject = audioStream;

                audioRef.current.onloadedmetadata = async function () {
                    try {
                        audioRef.current?.play();
                    } catch (error) {
                        console.error(error);
                    }
                };

                audioRef.current.onerror = function () {
                    console.error("Error occurred while playing audio stream.");
                };
            }
        },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [audioStream],
    );

    useEffect(
        function () {
            if (screenVideo && screenVideoRef.current) {
                screenVideoRef.current.srcObject = screenVideo;

                screenVideoRef.current.onloadedmetadata = async function () {
                    try {
                        screenVideoRef.current?.play();
                    } catch (error) {
                        console.error(error);
                    }
                };

                screenVideoRef.current.onerror = function () {
                    console.error("Error occurred while playing screen video.");
                };
            }
        },
        [screenVideo],
    );

    useEffect(
        function () {
            if (screenAudio && screenAudioRef.current) {
                screenAudioRef.current.srcObject = screenAudio;

                screenAudioRef.current.onloadedmetadata = async function () {
                    try {
                        screenAudioRef.current?.play();
                    } catch (error) {
                        console.error(error);
                    }
                };

                screenAudioRef.current.onerror = function () {
                    console.error("Error occurred while playing screen audio.");
                };
            }
        },
        [screenAudio],
    );

    return (
        <Fragment>
            <div
                className={cn(
                    "streamer-video",
                    "grid size-full place-items-center overflow-hidden bg-black",
                    tileClass,
                )}
            >
                {videoStream && videoStreamState === "playable" ? (
                    <div className="aspect-video">
                        <video autoPlay className="size-full object-cover" muted ref={videoRef} />
                    </div>
                ) : (
                    <span className="text-xl text-white">{tileClass}</span>
                )}
            </div>

            {audioStream && audioStreamState === "playable" && !isLocal ? <audio autoPlay ref={audioRef} /> : null}

            {screenVideo ? (
                <div className={cn("streamer-screen", "grid size-full place-items-center bg-black")}>
                    <div className="aspect-video">
                        <video autoPlay className="size-full" muted ref={screenVideoRef} />
                    </div>
                </div>
            ) : null}
            {screenAudio && !isLocal ? <audio autoPlay ref={screenAudioRef} /> : null}
        </Fragment>
    );
});
