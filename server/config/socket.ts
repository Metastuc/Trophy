import { createServer } from "http";
import { Server } from "socket.io";

import { SERVER_ENV } from "./constants";
import { privy } from "./privy";

let io: Server | undefined;

export function initIO(server: ReturnType<typeof createServer>) {
    io = new Server(server, { cors: { origin: SERVER_ENV.CLIENT_URL } });

    io.use(async function (socket, next) {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication error: Token is required"));
        }

        try {
            const privyUser = await privy.verifyAuthToken(token, SERVER_ENV.PRIVY_KEY);
            socket.data.user = privyUser.userId;
            next();
        } catch (error) {
            next(new Error("Unauthorized: " + (error as Error).message));
        }
    });

    // io.on("connection", (socket) => {
    //     registerSocketEvents({ io: getIO(), socket });
    // });

    return io;
}

export function getIO() {
    if (!io) throw new Error("Socket.io not initialized yet!");
    return io;
}
