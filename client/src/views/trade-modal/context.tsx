import { PropsWithChildren, useMemo, useState } from "react";

import { TradeDrawerContext } from "./hooks";

interface iTradeDrawerContextProvider extends PropsWithChildren, iTradeDrawer {}

export function TradeDrawerContextProvider({ children }: iTradeDrawerContextProvider) {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const value = useMemo(
        () => ({
            isDrawerOpen,
            closeDrawer: () => setIsDrawerOpen(false),
            openDrawer: () => setIsDrawerOpen(true),
        }),
        [isDrawerOpen],
    );

    return <TradeDrawerContext.Provider value={value}>{children}</TradeDrawerContext.Provider>;
}
