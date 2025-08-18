import { TradeDrawer } from "@/views/trade-modal";

import { useLeaderboardStreamerContext } from "../hooks";
import { Outcome } from "./outcome";
import { LeaderboardStreamerProfile } from "./profile";

export function StreamLeader({ counter }: { counter: number }) {
    const { price } = useLeaderboardStreamerContext();

    return (
        <article>
            <header className="flex w-full items-center justify-between px-3 pt-1.5">
                <aside className="flex items-center gap-3">
                    <span>#{counter}</span>
                    <LeaderboardStreamerProfile />
                </aside>

                <aside className="flex items-center gap-2">
                    <Outcome />
                    <span className="text-sm font-medium">${price}</span>
                </aside>
            </header>

            <footer className="flex w-full items-center justify-end px-3 pb-1.5">
                <TradeDrawer />
            </footer>
        </article>
    );
}
