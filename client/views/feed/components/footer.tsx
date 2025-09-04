import { Users } from "lucide-react";

import { useFeedContext } from "../hooks";

export function FeedStreamFooter() {
    const { title, viewers } = useFeedContext();

    return (
        <footer className="flex items-center justify-between">
            <aside>
                <span>{title}</span>
            </aside>

            <aside className="bg-black100 flex gap-1 rounded-xs p-2">
                <i className="text-blue100 size-2.5">
                    <Users />
                </i>
                <span className="text-[.5rem] text-white">{viewers} watching</span>
            </aside>
        </footer>
    );
}
