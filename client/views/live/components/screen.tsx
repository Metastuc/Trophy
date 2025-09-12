import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import { Fragment } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { useAuthenticationStore } from "#~/store/authentication.ts";
import { getFollowStatus } from "@/api/subscription";
import { StreamerPFP } from "@/components/ui/streamer-pfp";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS } from "@/lib/constants";

import { cn } from "@/lib/utils";
import { useLiveStreamContext } from "../hooks";
import { LiveStreamControls } from "./controls";
import { LiveStreamLayout } from "./layout";

export function LiveStreamScreen() {
    const { username, title, profileImage } = useLiveStreamContext();
    const { authenticatedUser, isAuthenticated } = useAuthenticationStore(
        useShallow((state) => ({
            authenticatedUser: state.user?.backendUserData.user.username,
            isAuthenticated: state.isAuthenticated,
        })),
    );

    const { data: isFollowingStatus, isPending: isFollowingStatusPending } = useQuery({
        queryKey: ["follow-status", username],
        queryFn: async () => getFollowStatus(username),
        refetchOnWindowFocus: false,
        enabled: isAuthenticated && !!username,
    });

    const isStreamer = isAuthenticated && username === authenticatedUser;
    const isFollowing = isFollowingStatus?.isFollowing;

    const { mutate, isPending: isMutating } = useServer(
        {
            METHOD: isFollowing ? "DELETE" : "POST",
            URL: isFollowing
                ? API_ENDPOINTS.SUBSCRIPTION.UNFOLLOW_USER(username)
                : API_ENDPOINTS.SUBSCRIPTION.FOLLOW_USER(username),
        },

        {
            onSuccess() {
                toast.success(isFollowing ? "Unfollowed successfully!" : "Followed successfully!");
            },
        },
    );

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
                            <StreamerPFP imageSrc={profileImage} imageAlt={`${username}-pfp`} isLive />
                        </div>
                        <span>@{username}</span>
                    </div>

                    {!isStreamer ? (
                        <button
                            className={cn(
                                "flex h-8 items-center justify-center rounded-xs px-2 text-white shadow-sm",
                                isMutating || isFollowingStatusPending
                                    ? "cursor-not-allowed opacity-50"
                                    : "bg-blue100 opacity-100",
                            )}
                            onClick={() => mutate({ username })}
                            disabled={isMutating || isFollowingStatusPending}
                        >
                            <span className="text-sm">{isFollowingStatus?.isFollowing ? "Following" : "Follow"}</span>
                        </button>
                    ) : null}

                    <button
                        className="bg-blue100 flex h-8 items-center justify-center gap-1 rounded-xs px-2 text-white shadow-sm"
                        onClick={handleShare}
                    >
                        <span className="text-sm">Share</span>
                        <i className="size-4">
                            <Link />
                        </i>
                    </button>
                </aside>

                <aside className="font-medium">{title}</aside>
            </section>
        </Fragment>
    );
}
