import { Fragment, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface iStreamerVideoTile {
    videoStream?: MediaStream | null;
    videoStreamState?: "playable" | "unavailable" | "paused" | "available";

    audioStream?: MediaStream | null;
    audioStreamState?: "playable" | "unavailable" | "paused" | "available";

    screenVideo?: MediaStream | null;
    screenAudio?: MediaStream | null;
}

export function StreamerVideoTile({
    audioStream,
    audioStreamState,
    screenAudio,
    screenVideo,
    videoStream,
    videoStreamState,
}: iStreamerVideoTile) {
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
                        await videoRef.current?.play();
                    } catch (error) {
                        console.error("Error playing video stream:", error);
                    }
                };

                videoRef.current.onerror = function () {
                    console.error("Error occurred while playing video stream.");
                };
            }
        },
        [videoStream, videoStreamState],
    );

    useEffect(
        function () {
            if (audioStream && audioRef.current && audioStreamState === "playable") {
                audioRef.current.srcObject = audioStream;

                audioRef.current.onloadedmetadata = async function () {
                    try {
                        await audioRef.current?.play();
                    } catch (error) {
                        console.error("Error playing audio stream:", error);
                    }
                };

                audioRef.current.onerror = function () {
                    console.error("Error occurred while playing audio stream.");
                };
            }
        },
        [audioStream, audioStreamState],
    );

    useEffect(
        function () {
            if (screenVideo && screenVideoRef.current) {
                screenVideoRef.current.srcObject = screenVideo;

                screenVideoRef.current.onloadedmetadata = async function () {
                    try {
                        await screenVideoRef.current?.play();
                    } catch (error) {
                        console.error("Error playing screen video:", error);
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
                        await screenAudioRef.current?.play();
                    } catch (error) {
                        console.error("Error playing screen audio:", error);
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
            {videoStream && videoStreamState === "playable" ? (
                <div className={cn("streamer-video", "flex w-full items-center justify-center bg-black")}>
                    <div className="aspect-video">
                        <video autoPlay className="size-full object-cover" muted ref={videoRef} />
                    </div>
                </div>
            ) : null}
            {audioStream && audioStreamState === "playable" ? <audio autoPlay ref={audioRef} /> : null}

            {screenVideo ? (
                <div className={cn("streamer-screen", "flex items-center justify-center bg-black")}>
                    <div className="aspect-video">
                        <video autoPlay className="size-full object-cover" muted ref={screenVideoRef} />
                    </div>
                </div>
            ) : null}
            {screenAudio ? <audio autoPlay ref={screenAudioRef} /> : null}
        </Fragment>
    );
}
