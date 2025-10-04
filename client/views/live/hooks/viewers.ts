import { useEffect } from "react";

import { useSocket } from "@/hooks/socket";
import { toTime } from "#~/utils/time.ts";

export function useRoomViewers({
    isConnected,
    roomId,
    username,
}: {
    roomId: string;
    username: string;
    isConnected: boolean;
}) {
    const socket = useSocket();

    useEffect(
        function () {
            if (!roomId || !username || !isConnected) return;

            socket.emit("viewer.join", { identifier: username, roomId });

            const heartbeat = setInterval(
                function () {
                    socket.emit("viewer.heartbeat", { identifier: username, roomId });
                },
                toTime({ unit: "seconds", value: 20, output: "milliseconds" }),
            );

            function cleanup() {
                clearInterval(heartbeat);
                socket.emit("viewer.leave", { identifier: username, roomId });
            }

            window.addEventListener("beforeunload", cleanup);

            return () => {
                cleanup();
                window.removeEventListener("beforeunload", cleanup);
            };
        },
        [socket, roomId, username, isConnected],
    );
}
