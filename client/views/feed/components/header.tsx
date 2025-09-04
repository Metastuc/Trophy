import { Link } from "@tanstack/react-router";

import { StreamerPFP } from "@/components/ui/streamer-pfp";
import { TradeDrawer } from "@/views/trade-token-drawer";

import { useFeedContext } from "../hooks";

export function FeedStreamHeader() {
    const { streamer } = useFeedContext();

    return (
        <header className="flex h-8 items-center justify-between">
            <Link
                to="/$username"
                params={{ username: streamer.username }}
                className="flex items-center justify-center gap-1"
            >
                <i className="size-9">
                    <StreamerPFP imageSrc={streamer.profileImage} imageAlt={`${streamer.username}-pfp`} isLive />
                </i>

                <span className="text-sm">@{streamer.username}</span>
            </Link>

            {streamer.creatorToken ? <TradeDrawer streamer={streamer} /> : null}
        </header>
    );
}
