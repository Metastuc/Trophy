import { PropsWithChildren, useMemo, useState } from "react";

import { TipDrawerContext } from "./hooks";

type TipDrawerContextProviderProps = PropsWithChildren<TipDrawerProps>;

export function TipDrawerContextProvider({ children, streamer }: TipDrawerContextProviderProps) {
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

    return <TipDrawerContext.Provider value={value}>{children}</TipDrawerContext.Provider>;
}
