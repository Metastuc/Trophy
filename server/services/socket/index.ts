import { log } from "#~/utils/logger.ts";

import { chatHandler } from "./chat";
import { roomHandler } from "./room";
// import { userHandler } from "./user";

export function registerSocketEvents({ io, socket }: Handler) {
    log({ data: { socketId: socket.id }, module: "socket", msg: "🔌 Client connected" });

    roomHandler({ io, socket });
    chatHandler({ io, socket });
    // userHandler({ io, socket });

    socket.on("disconnect", function () {
        log({ data: { socketId: socket.id }, module: "socket", msg: "🔌 Client disconnected" });
    });
}
