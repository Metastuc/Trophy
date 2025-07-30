import { StreamerLivePFP } from "@/components/ui/streamer-live-pfp";
import { useRouteContext } from "@tanstack/react-router";

export function StreamContext() {
    const { streamCreator, streamResponse } = useRouteContext({
        from: "/live/$id",
    });

    return (
        <section className="mt-2 mb-8.5">
            <aside className="flex items-center justify-start gap-1">
                <div className="size-8.5">
                    <StreamerLivePFP imageSrc="https://placehold.co/400x400/pink/blue" imageAlt="" />
                </div>
                <span className="text-sm">@{streamCreator.user.username}</span>

                <button className="">Follow</button>
            </aside>

            <aside>
                <span>{streamResponse.title}</span>
            </aside>
        </section>
    );
}
