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

    const currentScreenShareSession: Record<string, string | null> = {};

    socket.on("room.screen.share.start", function ({ roomId, userId }: { roomId: string; userId: string }) {
        if (currentScreenShareSession[roomId]) {
            socket.emit("room.screen.share.denied", { message: "Another streamer is currently sharing their screen." });
            return;
        }

        currentScreenShareSession[roomId] = userId;
        io.to(roomId).emit("room.screen.share.started", { roomId, userId });
    });

    socket.on("room.screen.share.stop", function ({ roomId, userId }: { roomId: string; userId: string }) {
        if (currentScreenShareSession[roomId] !== userId) {
            return;
        }

        currentScreenShareSession[roomId] = null;
        io.to(roomId).emit("room.screen.share.stopped", { roomId, userId });
    });
}
