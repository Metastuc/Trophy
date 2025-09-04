import { FeedStreamFooter } from "./footer";
import { FeedStreamHeader } from "./header";
import { FeedStreamMain } from "./main";

export function FeedStreamWrapper() {
    return (
        <article className="h-72 space-y-2">
            <FeedStreamHeader />
            <FeedStreamMain />
            <FeedStreamFooter />
        </article>
    );
}
