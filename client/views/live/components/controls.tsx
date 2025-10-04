import { useLocalAudio, useLocalScreenShare, useLocalVideo, useRoom } from "@huddle01/react";
import { useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, MonitorDown, MonitorUp, MonitorX, UserPlus, Users, Video, VideoOff } from "lucide-react";
import { Fragment, HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { LiveSignal } from "@/components/ui/live-signal";
import { useAuthenticationStore } from "@/hooks/authentication";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { toTime } from "#~/utils/time.ts";

import { useLiveStreamContext, useLiveStreamPermissions, useLiveStreamScreenSharing } from "../hooks";

export function LiveStreamControls() {
    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);
    const streamControlsRef = useRef<HTMLDivElement>(null);

    function toggleControls() {
        setIsControlsVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(
            () => setIsControlsVisible(false),
            toTime({ unit: "seconds", value: 5, output: "milliseconds" }),
        );
    }

    useEffect(function () {
        const el = streamControlsRef.current;
        if (!el) return;

        toggleControls();

        el.addEventListener("mousemove", toggleControls);
        el.addEventListener("touchstart", toggleControls);

        return () => {
            el.removeEventListener("mousemove", toggleControls);
            el.removeEventListener("touchstart", toggleControls);

            if (hideTimeout.current) clearTimeout(hideTimeout.current);
        };
    }, []);

    return (
        <section className="absolute inset-0 z-10" ref={streamControlsRef}>
            <div
                className={cn(
                    "relative size-full transition-opacity",
                    isControlsVisible ? "opacity-100" : "opacity-20",
                )}
            >
                <LiveSignal />

                <div className="absolute bottom-0 flex w-full items-center justify-between p-1.5">
                    <aside className="flex max-w-[8rem] min-w-[6.75rem] items-center justify-between rounded bg-white p-1">
                        <i className="size-4">
                            <Users />
                        </i>
                        <span className="mr-auto ml-1 pt-0.5 text-[.5rem]">{0} watching</span>
                        {/* <span className="ml-1 pt-0.5 text-[.5rem]">10:12:13</span> */}
                    </aside>

                    <aside className="flex gap-2">
                        <RenderControlsBasedOnRole />
                    </aside>
                </div>
            </div>
        </section>
    );
}

function RenderControlsBasedOnRole() {
    const navigate = useNavigate();
    const username = useAuthenticationStore((state) => state.user?.backendUserData.user.username as string);

    const { closeRoom } = useRoom();
    const { isAudioOn, enableAudio, disableAudio } = useLocalAudio();
    const { isVideoOn, enableVideo, disableVideo } = useLocalVideo();
    const { shareStream } = useLocalScreenShare();

    const { canEndStream, canInvite, canShareScreen, canToggleAudio, canToggleVideo } = useLiveStreamPermissions();
    const { startScreenShare, stopScreenShare } = useLiveStreamScreenSharing();
    const { isHuddleConnected, isInvitationDrawerOpen, openInvitationDrawer, closeInvitationDrawer, roomId } =
        useLiveStreamContext();

    const { mutate } = useServer<{ username: string }, ApiResponse<undefined>>(
        { METHOD: "PATCH", URL: API_ENDPOINTS.STREAMS.END_STREAM(roomId) },

        {
            onSuccess(response) {
                toast.success(response.data.message);
            },
        },
    );

    async function handleToggleVideo() {
        try {
            if (isVideoOn) {
                await disableVideo();
            } else {
                await enableVideo({ prefferedCodec: "video/vp8" }).then((response) => console.log(response));
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to toggle video.";
            toast.error(message);
            console.error("Error toggling video:", error);
        }
    }

    async function handleToggleAudio() {
        try {
            if (isAudioOn) {
                await disableAudio();
            } else {
                await enableAudio();
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to toggle audio.";
            toast.error(message);
            console.error("Error toggling audio:", error);
        }
    }

    async function handleToggleScreenShare() {
        try {
            if (shareStream) {
                await stopScreenShare();
            } else {
                await startScreenShare();
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to share screen.";
            toast.error(message);
        }
    }

    function toggleCoHostDrawer() {
        if (isInvitationDrawerOpen) closeInvitationDrawer();
        else openInvitationDrawer();
    }

    async function handleEndStream() {
        try {
            closeRoom();
            navigate({ to: "/" });
            mutate({ username });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to end stream.";
            toast.error(message);
            console.error("Error ending the stream:", error);
        }
    }

    if (!isHuddleConnected) {
        return null;
    }

    return (
        <Fragment>
            {canEndStream ? (
                <ControlButton className="gap-1 text-red-600" onClick={handleEndStream}>
                    <i className="size-4">
                        <MonitorX />
                    </i>
                    <span className="text-[.5rem]">end</span>
                </ControlButton>
            ) : null}

            {canShareScreen ? (
                <ControlButton onClick={handleToggleScreenShare}>
                    <i className="size-4">{shareStream ? <MonitorDown /> : <MonitorUp />}</i>
                </ControlButton>
            ) : null}

            {canInvite ? (
                <ControlButton onClick={toggleCoHostDrawer}>
                    <i className="size-4">
                        <UserPlus />
                    </i>
                </ControlButton>
            ) : null}

            {canToggleVideo ? (
                <ControlButton onClick={handleToggleVideo}>
                    <i className="size-4">{isVideoOn ? <Video /> : <VideoOff />}</i>
                </ControlButton>
            ) : null}

            {canToggleAudio ? (
                <ControlButton onClick={handleToggleAudio}>
                    <i className="size-4">{isAudioOn ? <Mic /> : <MicOff />}</i>
                </ControlButton>
            ) : null}
        </Fragment>
    );
}

type tControlButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

function ControlButton({ children, className, ...props }: tControlButtonProps) {
    return (
        <button className={cn(className, "flex items-center justify-center rounded bg-white p-1")} {...props}>
            {children}
        </button>
    );
}
