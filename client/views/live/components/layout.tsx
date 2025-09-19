import { cn } from "@/lib/utils";

import { LiveStreamStreamers } from "./streamers";

export function LiveStreamLayout() {
    return (
        <section className={cn("size-full")} id="live-stream-layout">
            <LiveStreamStreamers role="host" />
            <LiveStreamStreamers role="guest" />
            {/* <LiveStreamThumbnail/> */}
        </section>
    );
}
