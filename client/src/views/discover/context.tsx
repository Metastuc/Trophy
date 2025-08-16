import { PropsWithChildren, useMemo, useState } from "react";

import { LeaderboardStreamerContext } from "./hooks";

type tLeaderboardStreamerProvider = PropsWithChildren & Partial<iLeaderboard>;

export function LeaderboardStreamerContextProvider({
    children,
    arrow,
    epicStreams,
    mcap,
    pfp,
    price,
    topHolders,
    totalStreams,
    username,
}: tLeaderboardStreamerProvider) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const value = useMemo(
        () => ({
            arrow,
            epicStreams,
            isModalOpen,
            mcap,
            pfp,
            price,
            setIsModalOpen,
            topHolders,
            totalStreams,
            username,
        }),
        [arrow, epicStreams, isModalOpen, mcap, pfp, price, setIsModalOpen, topHolders, totalStreams, username],
    );

    return <LeaderboardStreamerContext.Provider value={value}>{children}</LeaderboardStreamerContext.Provider>;
}
