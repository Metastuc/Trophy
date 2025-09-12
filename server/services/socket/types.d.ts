import { Server, Socket } from "socket.io";

declare global {
    interface Handler {
        io: Server;
        socket: Socket;
    }
}

export {};
