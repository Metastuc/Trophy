import { cn } from "@/lib/utils";

import { useLiveStreamParticipants, useLiveStreamScreenSharing } from "../hooks";
import { getStreamLayoutKey } from "../utils";
import { LiveStreamStreamers } from "./streamers";

export function LiveStreamLayout() {
    const { streamerByRole } = useLiveStreamParticipants();
    const { someoneIsSharingTheirScreen } = useLiveStreamScreenSharing();

    const streamLayoutKey = getStreamLayoutKey({
        coHostCount: streamerByRole.guests.length,
        isScreenSharing: someoneIsSharingTheirScreen,
    });

    return (
        <section className={cn("size-full", streamLayoutKey)} id="live-stream-layout">
            <LiveStreamStreamers role="host" />
            <LiveStreamStreamers role="guest" />
            {/* <LiveStreamThumbnail/> */}
        </section>
    );
}
