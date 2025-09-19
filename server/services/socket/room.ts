import { log } from "#~/utils/logger.ts";
import { addParticipantToRoom, getRoom, removeParticipantFromRoom } from "#services/redis/room.ts";

export function roomHandler({ io, socket }: Handler) {
    async function updateRoomStreamers(roomId: string) {
        const { participants } = await getRoom(roomId);

        io.to(roomId).emit(
            "room.streamers.update",
            participants.map((participant) => ({
                peerId: participant.peerId,
                role: participant.role,
                userId: participant.id,
            })),
        );

        log.info({
            module: "roomHandler",
            msg: `Updated streamers for room ${roomId}`,
            data: participants,
            tag: "SOCKET",
        });
    }

    socket.on(
        "room.join",
        async function ({
            identifier,
            peerId,
            roomId,
            role: clientRole,
        }: {
            identifier: string;
            peerId: string;
            roomId: string;
            role: JoinStreamData["role"];
        }) {
            socket.join(roomId);

            log.info({
                module: "roomHandler",
                msg: `User ${identifier} (${clientRole}) joined room: ${roomId}`,
                tag: "SOCKET",
            });

            const { participants } = await getRoom(roomId);
            const existing = participants.find((participant) => participant.id === identifier);
            const role = existing ? existing.role : clientRole;

            if (existing && (existing.role === "host" || existing.role === "guest") && existing.peerId) {
                log.warn({
                    module: "roomHandler",
                    msg: `Replacing existing ${existing.role} ${identifier} with new peerId ${peerId}`,
                    data: { oldPeerId: existing.peerId, newPeerId: peerId },
                    tag: "SOCKET",
                });

                io.to(existing.peerId).emit("force.disconnect");
                await removeParticipantFromRoom({ roomId, userId: existing.id });
            }

            await Promise.all([
                await addParticipantToRoom({ role, roomId, userId: identifier, peerId }),
                await updateRoomStreamers(roomId),
            ]);

            io.to(roomId).emit("room.user.joined", { userId: socket.data.user, roomId });
        },
    );

    socket.on("room.leave", async function ({ identifier, roomId }: { identifier: string; roomId: string }) {
        console.log(`User ${socket.data.user} left room: ${roomId}`);
        socket.leave(roomId);

        await removeParticipantFromRoom({ roomId, userId: identifier });
        io.to(roomId).emit("room.user.left", { userId: socket.data.user, roomId });
    });

    socket.on("room.stream.started", function ({ roomId }: { roomId: string }) {
        console.log(`Stream started in room: ${roomId}`);
        io.to(roomId).emit("room.stream.started", { roomId });
    });

    socket.on("room.stream.stopped", function ({ roomId }: { roomId: string }) {
        console.log(`Stream stopped in room: ${roomId}`);
        io.to(roomId).emit("room.stream.stopped", { roomId });
    });

    socket.on(
        "room.session.switch",
        async function ({
            roomId,
            existingPeerId,
            identifier,
        }: {
            roomId: string;
            existingPeerId: string;
            identifier: string;
        }) {
            const { participants } = await getRoom(roomId);
            const participant = participants.find((participant) => participant.peerId === existingPeerId);

            if (participant) {
                io.to(existingPeerId).emit("force.disconnect");
                await removeParticipantFromRoom({ roomId, userId: participant.id });
            }

            await addParticipantToRoom({
                role: participant?.role ?? "listener",
                roomId,
                userId: identifier,
                peerId: socket.id,
            });
        },
    );
}
