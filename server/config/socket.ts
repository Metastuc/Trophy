import { createServer } from "http";
import { Server } from "socket.io";

import { SERVER_ENV } from "./constants";

export function initIO(server: ReturnType<typeof createServer>) {
    const io = new Server(server, {
        cors: {
            origin: SERVER_ENV.CLIENT_URL,
            // methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

        socket.on("room.join", function ({ roomId }) {
            socket.join(roomId);
            console.log(`✅ ${socket.id} joined app room ${roomId}`);
        });
    });

    return io;
}
