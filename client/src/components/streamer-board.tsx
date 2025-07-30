import StreamerProfile from "@/components/streamer-profile";
import { cn } from "@/lib/utils";
import { TradeDrawer } from "@/views/trade-modal";

interface iStreamerBoard {
    counter: number;
}

export default function Component({ counter }: iStreamerBoard) {
    return (
        <div className="bg-white100 flex h-17 flex-col items-center justify-between rounded-xs shadow-xs">
            <section className="flex w-full items-center justify-between px-3 pt-1.5">
                <aside className="flex items-center gap-3">
                    <span>#{counter}</span>
                    <StreamerProfile isButton={true} />
                </aside>

                <aside className="flex items-center gap-2">
                    <RenderOutcome outcome="win" value={1.25} />
                    <span className="text-sm font-medium">$0.0056</span>
                </aside>
            </section>

            <section className="flex w-full items-center justify-end px-3 pb-1.5">
                <TradeDrawer />
            </section>
        </div>
    );
}

interface iRenderOutcome {
    outcome: "win" | "lose";
    value: number;
}

function RenderOutcome({ outcome, value }: iRenderOutcome) {
    const icon = (
        <svg width={10} height={8} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 .5L9.33 8H.67L5 .5z" fill="currentColor" />
        </svg>
    );

    return (
        <div
            className={cn(
                outcome === "win" ? "text-green-600" : "text-red-600",
                "flex items-center justify-center leading-[.625rem]",
            )}
        >
            <i className={cn(outcome === "win" ? "rotate-0" : "rotate-180", "size-2.5")}>{icon}</i>
            <span className="pt-0.5 text-[.625rem]">{value}%</span>
        </div>
    );
}
