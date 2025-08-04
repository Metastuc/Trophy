import { format } from "date-fns";
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

            <footer className="space-y-0">
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
    const formattedDate = format(new Date(date as string), "MMM d, yyyy h:mm a");

    return (
        <article className="border border-red-600 ">
            <header className="">
                <aside>
                    <div></div>
                    <div></div>
                </aside>
                <aside></aside>
            </header>

            <main>
                <span>{title}</span>
                <div>
                    <i></i>
                    <span>{formattedDate}</span>
                </div>
            </main>

            <footer></footer>
        </article>
    );
}
