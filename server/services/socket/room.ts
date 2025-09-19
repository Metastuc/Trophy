import { addParticipantToRoom, getRoom, removeParticipantFromRoom } from "#services/streams/redis.utils.ts";

export function roomHandler({ io, socket }: Handler) {
    socket.on(
        "room.join",
        async function ({ identifier, peerId, roomId }: { identifier: string; peerId: string; roomId: string }) {
            socket.join(roomId);

            const { participants } = await getRoom(roomId);
            const existing = participants.find((participant) => participant.id === identifier);
            const role = existing ? existing.role : "listener";

            if (existing && (existing.role === "host" || existing.role === "guest") && existing.peerId) {
                socket.emit("room.session.conflict", {
                    message: "You are already streaming on another device.",
                    existingPeerId: existing.peerId,
                    role: existing.role,
                });
                return;
            }

            await addParticipantToRoom({ role, roomId, userId: identifier, peerId });
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
