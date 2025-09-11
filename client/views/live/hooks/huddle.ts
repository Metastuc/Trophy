import { useLocalPeer, useRoom } from "@huddle01/react";
import { useEffect } from "react";

import { log } from "#~/utils/logger.ts";

export function useHuddleJoinRoom({ roomId, token }: { roomId: string; token: string }) {
    const { role } = useLocalPeer();

    const { joinRoom, leaveRoom } = useRoom({
        onJoin(data) {
            log({ data: { data }, module: "LIVE STREAM CONNECT", msg: "✅ joined Huddle room", tag: "HUDDLE" });
        },
        onLeave(data) {
            log({ data: { data }, module: "LIVE STREAM CONNECT", msg: "👋 left Huddle room", tag: "HUDDLE" });
        },
    });

    useEffect(
        function () {
            if (!roomId || !token) {
                log({ msg: "❌ Missing roomId or token for Huddle join", tag: "HUDDLE" });
                return;
            }

            joinRoom({ roomId, token }).catch((error) => {
                log({
                    data: { error },
                    module: "LIVE STREAM CONNECT",
                    msg: "❌ Error joining Huddle room",
                    tag: "HUDDLE",
                });
            });

            return () => {
                leaveRoom();
            };
        },
        [joinRoom, leaveRoom, roomId, token],
    );

    return { role };
}
