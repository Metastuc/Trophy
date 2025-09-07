import { BadgeDollarSign, Receipt } from "lucide-react";

import { useUserProfileContext } from "../hooks";
// import { EditProfile } from "./edit";

export function About() {
    const { isCurrentUser, profileData } = useUserProfileContext();

    return (
        <header className="flex items-start gap-1 px-4">
            <aside className="flex w-15 items-center justify-center">
                <img
                    alt="user-pfp"
                    className="size-14 rounded-full object-cover"
                    src={profileData.profilePicture as string}
                />
            </aside>

            <aside className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">@{profileData.username}</h3>

                    {!isCurrentUser ? (
                        <button className="bg-blue100 flex items-center justify-center gap-0.5 rounded px-3 text-white">
                            <i className="size-3">
                                <BadgeDollarSign />
                            </i>
                            <span className="text-xs">tip</span>
                        </button>
                    ) : null}
                </div>

                {profileData.bio ? (
                    <p className="max-h-16 min-h-8 w-48 overflow-hidden text-sm">{profileData.bio}</p>
                ) : null}

                <div className="flex gap-2">
                    <span className="">
                        <b className="text-blue100 font-normal">{profileData.followerCount}</b> Following
                    </span>

                    <span className="">
                        <b className="text-blue100 font-normal">{profileData.followerCount}</b> Followers
                    </span>

                    {/* {isCurrentUser ? <EditProfile /> : null} */}
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
