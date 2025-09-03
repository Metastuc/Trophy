import { PropsWithChildren, useMemo, useState } from "react";

import { TipDrawerContext } from "./hooks";

type TipContextProvider = PropsWithChildren<TipDrawer>;

export function TipDrawerContextProvider({ children, streamer }: TipContextProvider) {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

    const value = useMemo(
        () => ({
            isDrawerOpen,
            closeDrawer: () => setIsDrawerOpen(false),
            openDrawer: () => setIsDrawerOpen(true),
            streamer,
        }),
        [isDrawerOpen, streamer],
    );

    return <TipDrawerContext.Provider value={value}>{children}</TipDrawerContext.Provider>;
}
