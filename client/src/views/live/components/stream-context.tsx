import { useRouteContext } from "@tanstack/react-router";

import { StreamerLivePFP } from "@/components/ui/streamer-live-pfp";

export function StreamContext() {
    const { streamCreator, streamResponse, isCreator } = useRouteContext({
        from: "/live/$id",
    });

    return (
        <section className="mt-2 mb-8.5">
            <aside className="my-2 flex items-center justify-start gap-1">
                <div className="size-8.5">
                    <StreamerLivePFP
                        imageSrc="https://placehold.co/400x400/pink/blue"
                        imageAlt={`${streamCreator.user.username}-pfp`}
                        isLive
                    />
                </div>
                <span className="text-sm">@{streamCreator.user.username}</span>

                {!isCreator ? (
                    <button className="bg-blue100 ml-2 rounded px-3 py-0.5">
                        <span className="text-xs text-white">Follow</span>
                    </button>
                ) : null}
            </aside>

            <aside>
                <span>{streamResponse.title}</span>
            </aside>
        </section>
    );
}
