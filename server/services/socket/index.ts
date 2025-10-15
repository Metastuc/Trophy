import { SERVER_CONSTANTS } from "#config/constants.ts";
import { getActiveGuests } from "#services/redis/guests.ts";
import { getRoom } from "#services/redis/room.ts";
import { logger } from "#utils/logger.ts";

import { chatHandler } from "./chat";
import { guestsHandler } from "./guests";
import { roomHandler } from "./room";
import { userHandler } from "./user";

export function registerSocketEvents({ io, socket }: Handler) {
    logger.info(`Socket connected: ${socket.id}`);

    chatHandler({ io, socket });
    guestsHandler({ io, socket });
    roomHandler({ io, socket });
    userHandler({ io, socket });

    socket.on("disconnect", function () {
        logger.warn(`Socket disconnected: ${socket.id}`);
    });
}

export async function updateRoomStreamers({ io, roomId }: { io: Handler["io"]; roomId: string }) {
    const { participants } = await getRoom(roomId);
    io.to(roomId).emit("room.streamers.update", participants);
}

export async function verifyRoomGuestLimit({ roomId, socket }: { socket?: Handler["socket"]; roomId: string }) {
    const activeGuests = await getActiveGuests(roomId);

    if (activeGuests.length >= SERVER_CONSTANTS.MAX_STREAM_GUESTS) {
        if (socket) {
            socket.emit("guest.limit", {
                message: `Maximum of ${SERVER_CONSTANTS.MAX_STREAM_GUESTS} guests reached.`,
                roomId,
            });
            return;
        } else {
            throw new Error(`Maximum of ${SERVER_CONSTANTS.MAX_STREAM_GUESTS} guests reached in room: ${roomId}`);
        }
    }
}
