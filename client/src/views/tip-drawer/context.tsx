import { PropsWithChildren, useMemo, useState } from "react";

import { TipDrawerContext } from "./hooks";

type TipContextProvider = PropsWithChildren<TipDrawer>;

export function TipDrawerContextProvider({ children, streamerWalletAddress }: TipContextProvider) {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

    const value = useMemo(
        () => ({
            isDrawerOpen,
            closeDrawer: () => setIsDrawerOpen(false),
            openDrawer: () => setIsDrawerOpen(true),
            streamerWalletAddress,
        }),
        [isDrawerOpen, streamerWalletAddress],
    );

    return <TipDrawerContext.Provider value={value}>{children}</TipDrawerContext.Provider>;
}
