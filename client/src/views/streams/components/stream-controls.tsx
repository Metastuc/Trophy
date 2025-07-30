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
        <section className="absolute inset-0 z-10">
            <div className="relative size-full">
                <StreamerLiveSignal />

                <div className="absolute bottom-0 flex w-full items-center justify-between p-1.5">
                    <aside className="flex min-w-[6.75rem] max-w-[8rem] items-center justify-between rounded bg-white p-1">
                        <i className="size-4">{WATCHING()}</i>
                        <span className="mr-auto ml-1 pt-0.5 text-[.5rem]">{viewerCount} watching</span>
                        <span className="pt-0.5 text-[.5rem] ml-1">10:12:13</span>
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
    const { canEndStream, canInvite, canShareScreen, canToggleAudio, canToggleVideo } = useStreamingUIPermissions();

    return (
        <React.Fragment>
            {canEndStream ? (
                <ControlButton className="gap-1 text-red-600">
                    <i className="size-4">
                        <MonitorX />
                    </i>
                    <span className="text-[.5rem]">end</span>
                </ControlButton>
            ) : null}

            {canShareScreen ? (
                <ControlButton>
                    <i className="size-4">
                        <MonitorUp />
                    </i>
                </ControlButton>
            ) : null}

            {canInvite ? (
                <ControlButton className="">
                    <i className="size-4">
                        <UserPlus />
                    </i>
                </ControlButton>
            ) : null}

            {canToggleVideo ? (
                <ControlButton className="">
                    <i className="size-4">
                        <Video />
                    </i>
                </ControlButton>
            ) : null}

            {canToggleAudio ? (
                <ControlButton className="">
                    <i className="size-4">
                        <Mic />
                    </i>
                </ControlButton>
            ) : null}
        </React.Fragment>
    );
}

type tControlButtonProps = React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>;

function ControlButton({ children, className, ...props }: tControlButtonProps) {
    return (
        <button className={cn(className, "flex items-center justify-center rounded bg-white p-1")} {...props}>
            {children}
        </button>
    );
}
