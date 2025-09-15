import { useLocalPeer, useRoom } from "@huddle01/react/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

import { useSocket } from "@/hooks/socket";
import { log } from "#~/utils/logger.ts";

export function useHuddleJoinRoom({ roomId, token, username }: { roomId: string; token: string; username: string }) {
    const { role, peerId } = useLocalPeer();
    const socket = useSocket();

    const { joinRoom, leaveRoom } = useRoom({
        onJoin(data) {
            log({ data: { data }, module: "LIVE STREAM CONNECT", msg: "✅ joined Huddle room", tag: "HUDDLE" });
            socket.emit("room.join", { roomId, peerId, identifier: username });
        },
        onLeave(data) {
            log({ data: { data }, module: "LIVE STREAM CONNECT", msg: "👋 left Huddle room", tag: "HUDDLE" });
            socket.emit("room.leave", { roomId, peerId, identifier: username });
        },
    });

    useEffect(
        function () {
            if (!roomId || !token) return;

            joinRoom({ roomId, token }).catch(function (error) {
                toast.error(`Error joining Huddle room: ${(error as Error).message}`);
            });

            return () => {
                leaveRoom();
            };
        },
        [joinRoom, leaveRoom, roomId, token],
    );

    return { role: role as JoinStreamData["role"] };
}
