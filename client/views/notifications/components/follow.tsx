import { Dot } from "lucide-react";

export function FollowNotification({ follow, read }: FollowNotificationProps) {
    if (!follow) return;
    const { follower } = follow;

    return (
        <li className="flex items-center justify-start gap-5">
            <i className="size-5">
                <img src="/follow.svg" alt="followed_icon" />
            </i>

            <aside className="flex items-center justify-center">
                <i className="size-10 rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399]">
                    <img
                        className="size-9 rounded-full"
                        src={follower.profileImage as string}
                        alt={`${follower.username as string}-pfp`}
                    />
                </i>

                <b className="ml-2.5 font-normal">@{follower.username as string}</b>
                <span className="ml-1 font-light">followed you</span>

                {!read ? (
                    <i className="text-blue100 ml-2 size-1">
                        <Dot className="scale-[10]" />
                    </i>
                ) : null}
            </aside>
        </li>
    );
}
