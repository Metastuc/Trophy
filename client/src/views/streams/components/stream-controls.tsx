import { WATCHING } from "@/assets/icons";
import { StreamerLiveSignal } from "@/components/ui/streamer-live-signal";
import { cn } from "@/lib/utils";
import { Mic, MonitorUp, MonitorX, UserPlus, Video } from "lucide-react";
import React from "react";
import { useStreamingUIContext, useStreamingUIPermissions } from "../context";

export function StreamControls() {
    const { isHost, viewerCount } = useStreamingUIContext();

    console.log({ isHost });

    return (
        <section className="absolute size-full border border-red-600 bg-gray-300">
            <div className="relative size-full p-1.5">
                <StreamerLiveSignal />

                <div className="absolute bottom-0 flex w-full items-center justify-between">
                    <aside className="flex h-5 w-[6.75rem] items-center justify-between rounded bg-white px-1">
                        <i className="size-2.5">{WATCHING()}</i>
                        <span className="mr-auto ml-1 pt-0.5 text-[.5rem]">
                            {viewerCount} watching
                        </span>
                        <span className="pt-0.5 text-[.5rem]">10:12:13</span>
                    </aside>

                    <aside className="flex h-3 gap-2">
                        <RenderControlsBasedOnRole />
                    </aside>
                </div>
            </div>
        </section>
    );
}

function RenderControlsBasedOnRole() {
    const { isHost, isListener } = useStreamingUIContext();
    const { canEndStream, canInvite, canShareScreen, canToggleAudio, canToggleVideo } =
        useStreamingUIPermissions();

    return (
        <React.Fragment>
            {canEndStream ? (
                <ControlButton>
                    <i className="size-[.375rem]">
                        <MonitorX />
                    </i>
                    <span className="text-[.375rem]">end</span>
                </ControlButton>
            ) : null}

            {canShareScreen ? (
                <ControlButton>
                    <i className="size-3">
                        <MonitorUp />
                    </i>
                    <span>share screen</span>
                </ControlButton>
            ) : null}

            {canInvite ? (
                <ControlButton>
                    <i className="size-3">
                        <UserPlus />
                    </i>
                </ControlButton>
            ) : null}

            {canToggleVideo ? (
                <ControlButton>
                    <i className="size-3">
                        <Video />
                    </i>
                </ControlButton>
            ) : null}

            {canToggleAudio ? (
                <ControlButton>
                    <i className="size-3">
                        <Mic />
                    </i>
                </ControlButton>
            ) : null}
        </React.Fragment>
    );

    switch (true) {
        case isHost:
            return (
                <React.Fragment>
                    {canEndStream ? (
                        <ControlButton>
                            <span>end</span>
                        </ControlButton>
                    ) : null}

                    {canShareScreen ? (
                        <ControlButton>
                            <span>share screen</span>
                        </ControlButton>
                    ) : null}

                    {canInvite ? (
                        <ControlButton>
                            <span>invite</span>
                        </ControlButton>
                    ) : null}

                    {canToggleVideo ? (
                        <ControlButton>
                            <span>video</span>
                        </ControlButton>
                    ) : null}

                    {canToggleAudio ? (
                        <ControlButton>
                            <span>mic</span>
                        </ControlButton>
                    ) : null}
                </React.Fragment>
            );

        case isListener:
            return (
                <React.Fragment>
                    <ControlButton>
                        <i></i>
                    </ControlButton>
                </React.Fragment>
            );

        default:
            return null;
    }
}

type tControlButtonProps = React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>;

function ControlButton({ children, ...props }: tControlButtonProps) {
    return (
        <button
            className={cn(props.className, "flex items-center justify-between bg-white")}
            {...props}
        >
            {children}
        </button>
    );
}
