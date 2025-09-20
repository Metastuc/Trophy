import { log } from "#~/utils/logger.ts";
import { getRoom } from "#services/redis/room.ts";

import { chatHandler } from "./chat";
import { guestsHandler } from "./guests";
import { roomHandler } from "./room";
// import { userHandler } from "./user";

export function registerSocketEvents({ io, socket }: Handler) {
    log({ data: { socketId: socket.id }, module: "SOCKET", msg: "🔌 Client connected" });

    roomHandler({ io, socket });
    chatHandler({ io, socket });
    guestsHandler({ io, socket });

    socket.on("disconnect", function () {
        log({ data: { socketId: socket.id }, module: "SOCKET", msg: "🔌 Client disconnected" });
    });
}

export async function updateRoomStreamers({ io, roomId }: { io: Handler["io"]; roomId: string }) {
    const { participants } = await getRoom(roomId);
    io.to(roomId).emit("room.streamers.update", participants);
}
