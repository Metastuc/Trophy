import { PropsWithChildren, useMemo } from "react";

import { FeedContext } from "./hooks";

type FeedContextProviderProps = PropsWithChildren<{ isPending: boolean }> & FeedStream;

export function FeedContextProvider({
    children,
    id,
    isPending,
    roomId,
    streamer,
    thumbnail,
    title,
    viewers,
}: FeedContextProviderProps) {
    const value = useMemo(
        () => ({
            id,
            isPending,
            roomId,
            streamer,
            thumbnail,
            title,
            viewers,
        }),
        [id, isPending, roomId, streamer, thumbnail, title, viewers],
    );

    return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
