import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export function useSocket() {
    const context = useContext(SocketContext);

    if (context === undefined || context === null || !context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return context;
}
