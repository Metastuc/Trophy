import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { getFollowStatus } from "@/api/subscription";
import { useServer } from "@/hooks/server";
import { API_ENDPOINTS, queryClient } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuthenticationStore } from "#~/store/authentication.ts";

export function FollowUserButton({ username, styles }: { username: string; styles?: Record<string, string> }) {
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
    const isFollowing = isFollowingStatus?.isFollowing === true;

    const { mutate, isPending: isMutating } = useServer(
        {
            METHOD: isFollowing ? "DELETE" : "POST",
            URL: isFollowing
                ? API_ENDPOINTS.SUBSCRIPTION.UNFOLLOW_USER(username)
                : API_ENDPOINTS.SUBSCRIPTION.FOLLOW_USER(username),
        },
        {
            onMutate() {
                const previous = isFollowing;

                queryClient.setQueryData(["follow-status", username], {
                    isFollowing: !previous,
                });

                return { previous };
            },
            onSuccess(_data, _variables, context) {
                if (typeof context === "object" && context !== null && "previous" in context) {
                    const wasFollowing = context.previous;
                    toast.success(
                        wasFollowing ? `You have unfollowed ${username}` : `You are now following ${username}`,
                    );
                }

                queryClient.invalidateQueries({ queryKey: ["follow-status", username] });
            },
            onError(_data, _variables, context) {
                if (typeof context === "object" && context !== null && "previous" in context) {
                    queryClient.setQueryData(["follow-status", username], {
                        isFollowing: context.previous,
                    });
                }
            },
        },
    );

    function handleFollowClick() {
        if (!isAuthenticated) {
            toast.error(`You must be logged in to follow ${username}.`);
            return;
        }

        mutate({ username });
    }

    if (isStreamer) return null;

    return (
        <button
            className={cn(
                "flex w-22 items-center justify-center gap-1 rounded-xs py-1 text-white",
                isAuthenticated && (isMutating || isFollowingStatusPending)
                    ? "cursor-not-allowed bg-gray-600"
                    : "bg-blue100",
                styles?.button,
            )}
            onClick={handleFollowClick}
            disabled={isAuthenticated && (isMutating || isFollowingStatusPending)}
        >
            {isAuthenticated && (isMutating || isFollowingStatusPending) ? (
                <Loader className="size-4 animate-spin" />
            ) : (
                <span className={cn("pt-0.5 text-xs", styles?.text)}>{isFollowing ? "Following" : "Follow"}</span>
            )}
        </button>
    );
}
