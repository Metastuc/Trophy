import { createServer } from "http";
import { Server } from "socket.io";

import { registerSocketEvents } from "#services/socket/index.ts";

import { SERVER_ENV } from "./constants";
import { privy } from "./privy";

let io: Server | undefined;

export function initIO(server: ReturnType<typeof createServer>) {
    io = new Server(server, { cors: { origin: SERVER_ENV.CLIENT_URL } });

    io.use(async function (socket, next) {
        const { profileImage, token, username } = socket.handshake.auth;

        if (!token) {
            socket.data.user = null;
            return next();
        }

        try {
            const privyUser = await privy.verifyAuthToken(token, SERVER_ENV.PRIVY_KEY);
            socket.data.user = privyUser.userId;
            socket.data.profileImage = profileImage;
            socket.data.username = username;
            next();
        } catch (error) {
            next(new Error("Unauthorized: " + (error as Error).message));
        }
    });

    io.on("connection", (socket) => {
        registerSocketEvents({ io: getIO(), socket });
    });

    return io;
}

export function getIO() {
    if (!io) throw new Error("Socket.io not initialized yet!");
    return io;
}
