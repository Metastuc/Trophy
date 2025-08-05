import React from "react";

import { cn } from "@/lib/utils";

interface iStreamerVideoTile {
    videoStream?: MediaStream | null;
    videoStreamState?: "playable" | "unavailable" | "paused" | "available";

    audioStream?: MediaStream | null;
    audioStreamState?: "playable" | "unavailable" | "paused" | "available";

    screenVideo?: MediaStream | null;
    screenAudio?: MediaStream | null;

    className?: string;
}

export function StreamerVideoTile({
    audioStream,
    audioStreamState,
    className,
    screenAudio,
    screenVideo,
    videoStream,
    videoStreamState,
}: iStreamerVideoTile) {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const screenVideoRef = React.useRef<HTMLVideoElement | null>(null);
    const screenAudioRef = React.useRef<HTMLAudioElement | null>(null);

    React.useEffect(
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

    React.useEffect(
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

    React.useEffect(
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

    React.useEffect(
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
        <React.Fragment>
            {videoStream && videoStreamState === "playable" ? (
                <video autoPlay className={cn(className, "size-full object-cover")} muted ref={videoRef} />
            ) : null}

            {audioStream && audioStreamState === "playable" ? <audio autoPlay ref={audioRef} /> : null}

            {screenVideo ? (
                <video autoPlay className={cn(className, "size-full object-cover")} muted ref={screenVideoRef} />
            ) : null}
            {screenAudio ? <audio autoPlay ref={screenAudioRef} /> : null}
        </React.Fragment>
    );
}
