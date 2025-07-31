import { useRouteContext } from "@tanstack/react-router";

import { StreamerLivePFP } from "@/components/ui/streamer-live-pfp";

export function StreamContext() {
    const { streamCreator, streamResponse } = useRouteContext({
        from: "/live/$id",
    });

    return (
        <section className="mt-2 mb-8.5">
            <aside className="flex items-center justify-start gap-1 my-2">
                <div className="size-8.5">
                    <StreamerLivePFP imageSrc="https://placehold.co/400x400/pink/blue" imageAlt="" />
                </div>
                <span className="text-sm">@{streamCreator.user.username}</span>

                <button className="bg-blue100 rounded px-3 py-0.5 ml-2">
                    <span className="text-xs text-white">Follow</span>
                </button>
            </aside>

            <aside className="">
                <span>{streamResponse.title}</span>
            </aside>
        </section>
    );
}
