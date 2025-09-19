import { useLocalPeer } from "@huddle01/react";
import { useEffect, useState } from "react";

import { useSocket } from "@/hooks/socket";

export function useRoomParticipants(roomId: string) {
    const socket = useSocket();
    const { peerId: localPeerId } = useLocalPeer();
    const [roomStreamers, setRoomStreamers] = useState<Array<RedisParticipant>>([]);

    console.log({ roomStreamers });

    useEffect(
        function () {
            if (!roomId) return;

            function handleUpdate(streamers: Array<RedisParticipant>) {
                setRoomStreamers(streamers);
            }

            socket.on("room.streamers.update", handleUpdate);
            socket.on("room.user.joined", function ({ userId, roomId }) {
                console.log(`User ${userId} joined room: ${roomId}`);
            });

            return () => {
                socket.off("room.streamers.update", handleUpdate);
            };
        },
        [roomId, socket],
    );

    const localStreamer = roomStreamers.find((streamer) => streamer.peerId === localPeerId);
    const remoteStreamers = roomStreamers.filter((streamer) => streamer.peerId !== localPeerId);

    const hosts = roomStreamers.filter((streamer) => streamer.role === "host");
    const guests = roomStreamers.filter((streamer) => streamer.role === "guest");
    const listeners = roomStreamers.filter((streamer) => streamer.role === "listener");

    const remoteHosts = remoteStreamers.filter((streamer) => streamer.role === "host");
    const remoteGuests = remoteStreamers.filter((streamer) => streamer.role === "guest");
    const remoteListeners = remoteStreamers.filter((streamer) => streamer.role === "listener");

    return {
        localStreamer,
        remoteStreamers,
        hosts,
        guests,
        listeners,
        remoteHosts,
        remoteGuests,
        remoteListeners,
    };
}
