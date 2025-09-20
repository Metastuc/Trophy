import { cn } from "@/lib/utils";

import { useLiveStreamParticipants } from "../hooks";
import { getStreamLayoutKey } from "../utils";
import { LiveStreamStreamers } from "./streamers";

export function LiveStreamLayout() {
    const { streamerByRole } = useLiveStreamParticipants();
    const streamLayoutKey = getStreamLayoutKey({ coHostCount: streamerByRole.guests.length, isScreenSharing: false });

    console.log({ guests: streamerByRole.guests.length, streamLayoutKey });

    return (
        <section className={cn("size-full", streamLayoutKey)} id="live-stream-layout">
            <LiveStreamStreamers role="host" />
            <LiveStreamStreamers role="guest" />
            {/* <LiveStreamThumbnail/> */}
        </section>
    );
}
