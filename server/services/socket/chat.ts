import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";
import { getRoom } from "#services/streams/redis.utils.ts";

export function chatHandler({ io, socket }: Handler) {
    socket.on(
        "chat.send.text",
        async function ({ roomId, payload }: { roomId: string; payload: LiveStreamChatMessagesState }) {
            const roomKey = SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId);
            const messagesKey = `${roomKey}:messages`;

            const message = JSON.stringify({
                ...payload,
                timestamp: new Date().toISOString(),
            });
            await Promise.all([redis.rpush(messagesKey, message), redis.ltrim(messagesKey, -500, -1)]);

            io.to(roomId).emit("chat.receive.text", { roomId, payload });
        },
    );

    socket.on("chat.history", async function ({ roomId }: { roomId: string }) {
        const roomKey = SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId);
        const messagesKey = `${roomKey}:messages`;

        const raw = await redis.lrange(messagesKey, -50, -1);
        const messages = raw.map((message) => JSON.parse(message));

        socket.emit("chat.history", { roomId, messages });
    });

    socket.on(
        "chat.send.tip",
        async function ({ roomId, payload }: { roomId: string; payload: LiveStreamChatMessagesState }) {
            const room = await getRoom(roomId);

            if (room.status === "LIVE") {
                io.to(roomId).emit("chat.receive.tip", { roomId, payload });
            }
        },
    );
}
