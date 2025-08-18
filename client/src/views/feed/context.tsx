import { PropsWithChildren, useMemo } from "react";

import { FeedContext } from "./hooks";

interface iFeedContextProvider extends PropsWithChildren {
    isPending: boolean;
}

export function FeedContextProvider({ isPending, children }: iFeedContextProvider) {
    const value = useMemo(
        () => ({
            isPending,
        }),
        [isPending],
    );

    return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
