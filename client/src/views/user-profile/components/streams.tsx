import { StreamerLivePFP } from "@/components/ui/streamer-live-pfp";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarPlus, Link, Projector, SquarePen, SquarePlus, Trash2 } from "lucide-react";
import { useUserProfileContext } from "../context";

export function Streams() {
    const { isCurrentUser, streams } = useUserProfileContext();

    if (isCurrentUser) return <UserStreams />;

    return streams.map(function (value, index) {
        return <StreamArticle key={index} {...value} />;
    });
}

function UserStreams() {
    const { streams } = useUserProfileContext();

    return (
        <section>
            <header>scheduled streams</header>

            <footer className="space-y-3.5">
                {streams.map(function (value, index) {
                    return <StreamArticle key={index} {...value} />;
                })}
            </footer>
        </section>
    );
}

interface iStreamArticle {
    date?: string;
    roomId: string;
    status: "Live" | "Scheduled";
    streamer: string;
    title: string;
}

function StreamArticle({ roomId, status, streamer, title, date }: iStreamArticle) {
    const navigate = useNavigate();
    const { user, isCurrentUser } = useUserProfileContext();
    const formattedDate = format(new Date(date as string), "MMM d, yyyy h:mm a");

    return (
        <article className="bg-blue100 space-y-1.5 rounded-md border px-2 py-1.5 text-white">
            <header className="flex items-start justify-between">
                <aside className="flex items-center gap-1">
                    <div className="size-10">
                        <StreamerLivePFP
                            // imageSrc={user.userPfp}
                            imageSrc="https://placehold.co/400x400/pink/blue"
                            imageAlt={`${user.username}-pfp`}
                            isLive={false}
                        />
                    </div>
                    <span className="text-xs">@{streamer}</span>
                </aside>

                <aside>
                    <button
                        className="text-blue100 flex items-center justify-center gap-1.5 rounded bg-white px-2"
                        onClick={() => navigate({ to: `/live/${roomId}`, params: { id: roomId } })}
                    >
                        <i className="size-3">
                            <Projector />
                        </i>
                        <span className="pt-0.5 text-xs">{isCurrentUser ? "Start" : "Join"} stream</span>
                    </button>
                </aside>
            </header>

            <main>
                <span className="text-xs">{title}</span>
                <div className="flex items-center gap-1">
                    <i className="size-3">
                        <CalendarPlus />
                    </i>
                    <span className="pt-0.5 text-xs">
                        {status} - {formattedDate}
                    </span>
                </div>
            </main>

            <footer className="mt-4 flex items-center justify-end gap-3">
                {!isCurrentUser ? (
                    <button>
                        <i className="size-3">
                            <SquarePlus />
                        </i>
                    </button>
                ) : null}

                <button>
                    <i className="size-3">
                        <Link />
                    </i>
                </button>

                {isCurrentUser ? (
                    <button>
                        <i className="size-3">
                            <SquarePen />
                        </i>
                    </button>
                ) : null}

                {isCurrentUser ? (
                    <button>
                        <i className="size-3">
                            <Trash2 />
                        </i>
                    </button>
                ) : null}
            </footer>
        </article>
    );
}
