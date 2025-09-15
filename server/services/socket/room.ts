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

    socket.on("room.stream.started", function ({ roomId }: { roomId: string }) {
        console.log(`Stream started in room: ${roomId}`);
        io.to(roomId).emit("room.stream.started", { roomId });
    });

    socket.on("room.stream.stopped", function ({ roomId }: { roomId: string }) {
        console.log(`Stream stopped in room: ${roomId}`);
        io.to(roomId).emit("room.stream.stopped", { roomId });
    });
}
