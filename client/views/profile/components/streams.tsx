import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarPlus, Link, Projector, SquarePen, SquarePlus, Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";

import { Dropdown } from "@/components/ui/dropdown";
import { StreamerPFP } from "@/components/ui/streamer-pfp";
import { cn } from "@/lib/utils";

import { useUserProfileContext } from "../hooks";

export function Streams() {
    let content: ReactNode;
    const { isCurrentUser, profileData } = useUserProfileContext();

    switch (true) {
        case isCurrentUser:
            content = <UserStreams />;
            break;

        default:
            content = profileData.scheduledStreams.map((value) => <StreamArticle key={value.id} {...value} />);
            break;
    }

    return <div className={cn("py-4", !isCurrentUser && "space-y-3.5")}>{content}</div>;
}

function UserStreams() {
    const { profileData } = useUserProfileContext();
    const [content, setContent] = useState<StreamSelection>("scheduled");

    return (
        <section className="space-y-6">
            <header>
                <Dropdown
                    onChange={(value) => setContent(value as StreamSelection)}
                    options={[
                        { title: "Scheduled streams", value: "scheduled" },
                        { title: "Recorded streams", value: "recorded" },
                    ]}
                    icon="outlined"
                    value={content}
                />
            </header>

            <footer className="space-y-3.5">
                {profileData.scheduledStreams.map(function (value) {
                    return <StreamArticle key={value.id} {...value} />;
                })}
            </footer>
        </section>
    );
}

function StreamArticle({ roomId, title, scheduledAt }: UserProfileScheduledStream) {
    const navigate = useNavigate();
    const { profileData, isCurrentUser } = useUserProfileContext();
    const formattedDate = format(new Date(scheduledAt as Date), "MMM d, yyyy h:mm a");

    return (
        <article className="bg-blue100 space-y-1.5 rounded-md border px-2 py-1.5 text-white">
            <header className="flex items-start justify-between">
                <aside className="flex items-center gap-1">
                    <div className="size-10">
                        <StreamerPFP
                            imageSrc={profileData.profilePicture as string}
                            imageAlt={`${profileData.username}-pfp`}
                            isLive={false}
                        />
                    </div>
                    <span className="text-xs">@{profileData.username}</span>
                </aside>

                <aside>
                    <button
                        className="text-blue100 flex items-center justify-center gap-1.5 rounded bg-white px-2"
                        onClick={() => navigate({ to: `/live/${roomId}`, params: { room: roomId } })}
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
                    <span className="pt-0.5 text-xs">Scheduled - {formattedDate}</span>
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
