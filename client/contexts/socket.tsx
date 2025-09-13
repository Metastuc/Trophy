import { PropsWithChildren, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { SocketContext } from "@/hooks/socket";
import { CLIENT_ENV } from "@/lib/constants";
import { useAuthenticationStore } from "#~/store/authentication.ts";

export function SocketProvider({ children }: PropsWithChildren) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const token = useAuthenticationStore((state) => state.token);

    useEffect(
        function () {
            const ws = io(CLIENT_ENV.VITE_SERVER_URL, { auth: token ? { token } : {} });
            setSocket(ws);

            return function () {
                ws.disconnect();
                setSocket(null);
            };
        },
        [token],
    );

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
