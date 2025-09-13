import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";

export function roomHandler({ io, socket }: Handler) {
    socket.on("room.join", function ({ roomId }: { roomId: string }) {
        console.log(`User ${socket.data.user} joined room: ${roomId}`);
        socket.join(roomId);

        io.to(roomId).emit("room.user.joined", { userId: socket.data.user, roomId });
    });

    socket.on("room.leave", function ({ roomId }: { roomId: string }) {
        console.log(`User ${socket.data.user} left room: ${roomId}`);
        socket.leave(roomId);

        io.to(roomId).emit("room.user.left", { userId: socket.data.user, roomId });
    });

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
}
