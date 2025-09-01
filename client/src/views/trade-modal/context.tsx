import { PropsWithChildren, useMemo, useState } from "react";

import { TradeDrawerContext } from "./hooks";

type TradeDrawerContextProvider = PropsWithChildren<TradeDrawer>;

export function TradeDrawerContextProvider({ children, streamer }: TradeDrawerContextProvider) {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const value = useMemo(
        () => ({
            isDrawerOpen,
            closeDrawer: () => setIsDrawerOpen(false),
            openDrawer: () => setIsDrawerOpen(true),
            streamer,
        }),
        [isDrawerOpen, streamer],
    );

    return <TradeDrawerContext.Provider value={value}>{children}</TradeDrawerContext.Provider>;
}
