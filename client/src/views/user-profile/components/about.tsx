import { BadgeDollarSign, Receipt } from "lucide-react";

import { useUserProfileContext } from "../context";

export function About() {
    const { user, isCurrentUser } = useUserProfileContext();

    return (
        <header className="flex items-start gap-1 px-4">
            <aside className="flex w-15 items-center justify-center">
                {/* <img alt="user-pfp" className="size-14 rounded-full" src={user.userPfp} /> */}
                <img
                    alt="user-pfp"
                    className="size-14 rounded-full object-cover"
                    src="https://www.dummyimage.com/200x200/000/fff"
                />
            </aside>

            <aside className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">@{user.username}</h3>

                    {!isCurrentUser ? (
                        <button className="bg-blue100 flex items-center justify-center gap-0.5 rounded px-3 text-white">
                            <i className="size-3">
                                <BadgeDollarSign />
                            </i>
                            <span className="text-xs">tip</span>
                        </button>
                    ) : null}
                </div>

                {user.bio ? <p className="max-h-16 min-h-8 w-48 overflow-hidden text-sm">{user.bio}</p> : null}

                <div className="flex gap-2">
                    <span className="">
                        <b className="text-blue100 font-normal">{user.following.length}</b> Following
                    </span>

                    <span className="">
                        <b className="text-blue100 font-normal">{user.followers.length}</b> Followers
                    </span>

                    {isCurrentUser ? (
                        <button className="bg-blue100 ml-auto flex items-center justify-center rounded-xs px-2">
                            <span className="text-[0.5rem] text-white">Edit Profile</span>
                        </button>
                    ) : null}
                </div>

                {!isCurrentUser ? (
                    <div className="mt-2 flex items-center gap-5">
                        <button className="bg-blue100 flex w-22 items-center justify-center gap-1 rounded-xs py-1">
                            <span className="pt-0.5 text-xs text-white">Follow</span>
                        </button>

                        <button className="bg-blue100 flex w-22 items-center justify-center gap-1 rounded-xs py-1 text-white">
                            <i className="size-3">
                                <Receipt />
                            </i>
                            <span className="pt-0.5 text-xs">Buy troph</span>
                        </button>
                    </div>
                ) : null}
            </aside>
        </header>
    );
}
