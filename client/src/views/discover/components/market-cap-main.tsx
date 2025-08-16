import { useLeaderboardStreamerContext } from "../hooks";

export function MarketCapMain() {
    const { epicStreams, mcap, totalStreams } = useLeaderboardStreamerContext();

    return (
        <main className="flex items-center justify-center gap-5 p-2">
            <aside className="bg-blue100 flex min-h-13.5 min-w-[6.5rem] flex-col items-center justify-between rounded-xs px-3 py-2">
                <span className="text-lg text-[#E8FF1A]">{totalStreams}</span>
                <span className="text-center text-xs text-white">Total streams</span>
            </aside>

            <aside className="bg-blue100 flex min-h-13.5 min-w-[6.5rem] flex-col items-center justify-between rounded-xs px-3 py-2">
                <span className="text-lg text-[#E8FF1A]">{epicStreams}</span>
                <span className="text-center text-xs text-white">Epic stream views</span>
            </aside>

            <aside className="bg-blue100 flex min-h-13.5 min-w-[6.5rem] flex-col items-center justify-between rounded-xs px-3 py-2">
                <span className="text-lg text-[#E8FF1A]">${mcap}</span>
                <span className="text-center text-xs text-white">Troph M.cap</span>
            </aside>
        </main>
    );
}
