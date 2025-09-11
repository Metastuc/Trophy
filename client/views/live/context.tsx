import { PropsWithChildren, useMemo } from "react";

import { LiveStreamContext } from "./hooks";

interface LiveStreamContextProviderProps extends PropsWithChildren {
    roomId: string;
}

export function LiveStreamContextProvider({ children, roomId }: LiveStreamContextProviderProps) {
    const value = useMemo(() => ({ roomId }), [roomId]);

    return <LiveStreamContext.Provider value={value}>{children}</LiveStreamContext.Provider>;
}
