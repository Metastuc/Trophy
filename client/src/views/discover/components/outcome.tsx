import { cn } from "@/lib/utils";

import { useLeaderboardStreamerContext } from "../hooks";

export function Outcome() {
    const { arrow } = useLeaderboardStreamerContext();

    const icon = (
        <svg width={10} height={8} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 .5L9.33 8H.67L5 .5z" fill="currentColor" />
        </svg>
    );

    return (
        <div
            className={cn(
                arrow === "up" ? "text-green-600" : "text-red-600",
                "flex items-center justify-center leading-[.625rem]",
            )}
        >
            <i className={cn(arrow === "up" ? "rotate-0" : "rotate-180", "size-2.5")}>{icon}</i>
            <span className="pt-0.5 text-[.625rem]">{"0.00"}%</span>
        </div>
    );
}
