import { BadgeDollarSign, Receipt } from "lucide-react";
import { Address } from "viem";

import { FollowUserButton } from "@/components/follow-button";
import { Button } from "@/components/ui/button";
import { TipDrawer } from "@/views/tip-token-drawer";

import { useUserProfileContext } from "../hooks";
import { useUserProfileDrawerStore } from "../store";

export function About() {
    const { isCurrentUser, profileData } = useUserProfileContext();
    const openDrawer = useUserProfileDrawerStore((state) => state.openDrawer);

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
                        <TipDrawer
                            trigger={
                                <button className="bg-blue100 flex items-center justify-center gap-0.5 rounded px-3 text-white">
                                    <i className="size-3">
                                        <BadgeDollarSign />
                                    </i>
                                    <span className="text-xs">tip</span>
                                </button>
                            }
                            streamer={{
                                profilePicture: profileData.profilePicture,
                                username: profileData.username,
                                walletAddress: profileData.walletAddress as Address,
                            }}
                        />
                    ) : null}
                </div>

                {profileData.bio ? (
                    <p className="max-h-16 min-h-8 w-48 overflow-hidden text-sm">{profileData.bio}</p>
                ) : null}

                <div className="flex gap-2">
                    <span className="">
                        <b className="text-blue100 font-normal">{profileData.followingCount}</b> Following
                    </span>

                    <span className="">
                        <b className="text-blue100 font-normal">{profileData.followerCount}</b> Followers
                    </span>

                    {/* {isCurrentUser ? <EditProfile /> : null} */}
                    {isCurrentUser ? (
                        <Button
                            className="bg-blue100 ml-auto flex items-center justify-center rounded-xs px-2"
                            onClick={() => openDrawer({ view: "edit" })}
                        >
                            <span className="text-[0.5rem] text-white">Edit Profile</span>
                        </Button>
                    ) : null}
                </div>

                {!isCurrentUser ? (
                    <div className="mt-2 flex items-center gap-5">
                        <FollowUserButton username={profileData.username} />

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
