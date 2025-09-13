import { Link } from "@tanstack/react-router";
import { Link as LinkIcon } from "lucide-react";
import { Fragment } from "react";
import { toast } from "sonner";

import { FollowUserButton } from "@/components/follow-button";
import { StreamerPFP } from "@/components/ui/streamer-pfp";

import { useLiveStreamContext } from "../hooks";
import { LiveStreamControls } from "./controls";
import { LiveStreamLayout } from "./layout";

export function LiveStreamScreen() {
    const { creatorUsername, title, creatorProfileImage } = useLiveStreamContext();

    async function handleShare() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    }

    return (
        <Fragment>
            <section style={{ backgroundImage: "url(/tv-bg.svg)", backgroundSize: "cover" }} className="aspect-video">
                <div className="relative aspect-video">
                    <LiveStreamControls />
                    <LiveStreamLayout />
                </div>
            </section>

            <section className="space-y-2 p-4">
                <aside className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="size-10">
                            <StreamerPFP imageSrc={creatorProfileImage} imageAlt={`${creatorUsername}-pfp`} isLive />
                        </div>

                        <Link to="/$username" params={{ username: creatorUsername }}>
                            <span>@{creatorUsername}</span>
                        </Link>
                    </div>

                    <FollowUserButton username={creatorUsername} styles={{ button: "h-8", text: "text-sm" }} />

                    <button
                        className="bg-blue100 flex h-8 items-center justify-center gap-1 rounded-xs px-3 text-white shadow-sm"
                        onClick={handleShare}
                    >
                        <span className="text-sm">Share</span>
                        <i className="size-3.5">
                            <LinkIcon />
                        </i>
                    </button>
                </aside>

                <aside className="font-medium">{title}</aside>
            </section>
        </Fragment>
    );
}
