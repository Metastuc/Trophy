import { useNavigate } from "@tanstack/react-router";

import { WATCHING } from "@/assets/icons";
import { StreamerLivePFP } from "@/components/ui/streamer-live-pfp";
import { StreamerLiveSignal } from "@/components/ui/streamer-live-signal";
import { TradeDrawer } from "@/views/trade-modal";

export function StreamArticle({
    creatorToken,
    pfp,
    roomId,
    status,
    streamer,
    thumbnail,
    title,
    viewers,
}: Partial<iStream>) {
    return (
        <article className="h-72 space-y-2">
            <RenderHeader pfp={pfp as string} streamer={streamer as string} creatorToken={creatorToken as string} />
            <RenderMain
                thumbnail={thumbnail as string}
                status={status as "Live" | "Scheduled" | "Ended"}
                roomId={roomId as string}
            />
            <RenderFooter title={title as string} viewers={viewers as number} />
        </article>
    );
}

function RenderHeader({ pfp, streamer, creatorToken }: { streamer: string; pfp: string; creatorToken: string }) {
    console.log("creatorToken", creatorToken);

    return (
        <header className="flex h-8 items-center justify-between">
            <aside className="flex items-center justify-center gap-1">
                <i className="size-9">
                    <StreamerLivePFP imageSrc={pfp} imageAlt={`${streamer}-pfp`} isLive />
                </i>

                <span className="text-sm">@{streamer}</span>
            </aside>

            <TradeDrawer />
        </header>
    );
}

function RenderMain({
    status,
    thumbnail,
    roomId,
}: {
    thumbnail: string;
    status: "Live" | "Scheduled" | "Ended";
    roomId: string;
}) {
    const navigate = useNavigate();

    return (
        <main
            className="relative h-53 w-full"
            onClick={() => navigate({ to: `/live/${roomId}`, params: { id: roomId } })}
        >
            {status === "Live" ? <StreamerLiveSignal /> : null}

            <div
                className="size-full rounded-none"
                style={{
                    backgroundImage: `url(${thumbnail})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            />
        </main>
    );
}

function RenderFooter({ title, viewers }: { title: string; viewers: number }) {
    return (
        <footer className="flex items-center justify-between">
            <aside>
                <span>{title}</span>
            </aside>

            <aside className="bg-black100 flex gap-1 rounded-xs p-2">
                <i className="size-2.5">{WATCHING()}</i>
                <span className="text-[.5rem] text-white">{viewers} watching</span>
            </aside>
        </footer>
    );
}
