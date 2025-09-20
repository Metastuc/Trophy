import { log } from "#~/utils/logger.ts";
import { addParticipantToRoom, getRoom } from "#services/redis/room.ts";

import { updateRoomStreamers } from ".";

export function roomHandler({ io, socket }: Handler) {
    socket.on(
        "room.join",
        async function ({ identifier, peerId, roomId }: { identifier: string; peerId: string; roomId: string }) {
            socket.join(roomId);

            let role: JoinStreamData["role"];
            const roomData = await getRoom(roomId);
            const existing = roomData.participants.find((participant) => participant.id === identifier);

            if (identifier === roomData.host) {
                role = "host";
            } else if (roomData.invitedGuests.includes(identifier)) {
                role = "guest";
            } else {
                role = "listener";
            }

            if (existing && (existing.role === "host" || existing.role === "guest") && existing.peerId) {
                log.warn({
                    module: "roomHandler",
                    msg: `Replacing existing ${existing.role} ${identifier} with new peerId ${peerId}`,
                    data: { oldPeerId: existing.peerId, newPeerId: peerId },
                    tag: "SOCKET",
                });

                io.to(existing.peerId).emit("force.disconnect");
                await addParticipantToRoom({ ...existing, peerId, roomId });
            }

            await addParticipantToRoom({
                role,
                roomId,
                id: identifier,
                peerId,
                profileImage: socket.data.profileImage,
                isGuest: !socket.data.username,
            });

            await updateRoomStreamers({ io, roomId });
            io.to(roomId).emit("room.user.joined", { userId: socket.data.user, roomId });
        },
    );

    socket.on("room.leave", async function ({ identifier, roomId }: { identifier: string; roomId: string }) {
        console.log(`User ${socket.data.user} left room: ${roomId}`);
        socket.leave(roomId);

        await addParticipantToRoom({
            role: "listener",
            roomId,
            id: identifier,
            peerId: undefined,
        });

        io.to(roomId).emit("room.user.left", { userId: socket.data.user, roomId });
        await updateRoomStreamers({ io, roomId });
    });

    socket.on("room.stream.started", function ({ roomId }: { roomId: string }) {
        console.log(`Stream started in room: ${roomId}`);
        io.to(roomId).emit("room.stream.started", { roomId });
    });

    socket.on("room.stream.stopped", function ({ roomId }: { roomId: string }) {
        console.log(`Stream stopped in room: ${roomId}`);
        io.to(roomId).emit("room.stream.stopped", { roomId });
    });

    // socket.on(
    //     "room.session.switch",
    //     async function ({
    //         roomId,
    //         existingPeerId,
    //         identifier,
    //     }: {
    //         roomId: string;
    //         existingPeerId: string;
    //         identifier: string;
    //     }) {
    //         const { participants } = await getRoom(roomId);
    //         const participant = participants.find((participant) => participant.peerId === existingPeerId);

    //         if (participant) {
    //             io.to(existingPeerId).emit("force.disconnect");
    //             await removeParticipantFromRoom({ roomId, userId: participant.id });
    //         }

    //         await addParticipantToRoom({
    //             role: participant?.role ?? "listener",
    //             roomId,
    //             id: identifier,
    //             peerId: socket.id,
    //         });
    //     },
    // );
}
