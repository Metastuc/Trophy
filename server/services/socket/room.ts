export function roomHandler({ io, socket }: Handler) {
    socket.on("room.join", function ({ roomId }: { roomId: string }) {
        console.log(`User ${socket.data.user} joined room: ${roomId}`);
        socket.join(roomId);

        io.to(roomId).emit("room.user.joined", { userId: socket.data.user, roomId });
    });

    socket.on("room.leave", function ({ roomId }: { roomId: string }) {
        console.log(`User ${socket.data.user} left room: ${roomId}`);
        socket.leave(roomId);

        io.to(roomId).emit("room.user.left", { userId: socket.data.user, roomId });
    });

    socket.on(
        "chat.send.text",
        function ({ roomId, payload }: { roomId: string; payload: LiveStreamChatMessagesState }) {
            console.log(`Chat message sent in room ${roomId}:`, payload);

            io.to(roomId).emit("chat.receive.text", { roomId, payload });
        },
    );
}
