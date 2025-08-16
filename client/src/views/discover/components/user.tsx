import { cn } from "@/lib/utils";

import { useLeaderboardStreamerContext } from "../hooks";

export function User() {
    const { pfp, username } = useLeaderboardStreamerContext();

    return (
        <aside className="flex items-center gap-0.5">
            <i className="size-8 rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399]">
                <img className={cn("user-pfp", "rounded-full")} src={pfp} alt={`${username}-pfp`} />
            </i>

            <span className="text-xs">@{username}</span>
        </aside>
    );
}
