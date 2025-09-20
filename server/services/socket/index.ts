import { log } from "#~/utils/logger.ts";

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
