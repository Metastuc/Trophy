import { useLocalPeer, useRoom } from "@huddle01/react/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

import { useSocket } from "@/hooks/socket";
import { log } from "#~/utils/logger.ts";

export function useHuddleJoinRoom({
    roomId,
    token,
    username,
    serverRole,
}: {
    roomId: string;
    token: string;
    username: string;
    serverRole: JoinStreamData["role"];
}) {
    const { role, peerId } = useLocalPeer();
    const socket = useSocket();

    console.log(peerId);

    const { joinRoom, leaveRoom, state } = useRoom({
        onJoin(data) {
            log({ data: { data }, module: "LIVE STREAM CONNECT", msg: "✅ joined Huddle room", tag: "HUDDLE" });
            socket.emit("room.join", { roomId, peerId, identifier: username, role: serverRole });
        },
        onLeave(data) {
            log({ data: { data }, module: "LIVE STREAM CONNECT", msg: "👋 left Huddle room", tag: "HUDDLE" });
            socket.emit("room.leave", { roomId, peerId, identifier: username, role: serverRole });
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

    useEffect(
        function () {
            socket.on(
                "room.session.conflict",
                function ({ message, existingPeerId }: { message: string; existingPeerId: string }) {
                    log({
                        data: { message, existingPeerId },
                        module: "LIVE STREAM CONNECT",
                        msg: "Session conflict detected",
                        tag: "HUDDLE",
                    });

                    // showModal({
                    //     message,
                    //     actions: [
                    //         {
                    //             label: "Switch Here",
                    //             onClick: () => socket.emit("room.session.switch", { roomId, identifier: username, existingPeerId }),
                    //         },
                    //         { label: "Cancel", onClick: () => leaveRoom() },
                    //     ],
                    // });
                },
            );
        },
        [socket],
    );

    return { role: role as JoinStreamData["role"], isHuddleConnected: state === "connected" };
}
