import { PropsWithChildren, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useShallow } from "zustand/shallow";

import { useAuthenticationStore } from "@/hooks/authentication";
import { SocketContext } from "@/hooks/socket";
import { CLIENT_ENV } from "@/lib/constants";

export function SocketProvider({ children }: PropsWithChildren) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { profileImage, token, username } = useAuthenticationStore(
        useShallow((state) => ({
            token: state.token,
            username: state.user?.backendUserData.user.username,
            profileImage: state.user?.backendUserData.user.profilePicture,
        })),
    );

    useEffect(
        function () {
            const ws = io(CLIENT_ENV.VITE_SERVER_URL, { auth: token ? { profileImage, token, username } : {} });
            setSocket(ws);

            return function () {
                ws.disconnect();
                setSocket(null);
            };
        },
        [profileImage, token, username],
    );

    useEffect(() => {
        if (!socket) return;
        socket.onAny((event, payload) => {
            console.log("🔔 socket event:", event, payload);
        });

        return () => {
            socket.offAny();
        };
    }, [socket]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
