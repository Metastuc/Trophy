import { PropsWithChildren, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { SocketContext } from "@/hooks/socket";
import { CLIENT_ENV } from "@/lib/constants";

export function SocketProvider({ children }: PropsWithChildren) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(function () {
        const ws = io(CLIENT_ENV.VITE_WS_URL);
        setSocket(ws);

        return function () {
            ws.disconnect();
        };
    }, []);

    if (!socket) return null;
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
