import { useLocalPeer } from "@huddle01/react";
import { useEffect, useMemo, useState } from "react";

import { useSocket } from "@/hooks/socket";

export function useRoomParticipants(roomId: string) {
    const socket = useSocket();
    const { peerId: localPeerId } = useLocalPeer();
    const [roomStreamers, setRoomStreamers] = useState<Array<RedisParticipant>>([]);

    useEffect(
        function () {
            if (!roomId) return;

            function handleUpdate(streamers: Array<RedisParticipant>) {
                setRoomStreamers(streamers);
            }

            socket.on("room.streamers.update", handleUpdate);

            return () => {
                socket.off("room.streamers.update", handleUpdate);
            };
        },
        [roomId, socket],
    );

    const localStreamer = useMemo(
        () => roomStreamers.find((streamer) => streamer.peerId === localPeerId),
        [roomStreamers, localPeerId],
    );

    const remoteStreamers = useMemo(
        () => roomStreamers.filter((streamer) => streamer.peerId !== localPeerId),
        [roomStreamers, localPeerId],
    );

    const streamerByRole = useMemo(
        () => ({
            hosts: remoteStreamers.filter((streamer) => streamer.role === "host"),
            guests: remoteStreamers.filter((streamer) => streamer.role === "guest"),
            listeners: remoteStreamers.filter((streamer) => streamer.role === "listener"),
        }),
        [remoteStreamers],
    );

    return {
        localStreamer,
        remoteStreamers,
        roomStreamers,
        streamerByRole,
    };
}
