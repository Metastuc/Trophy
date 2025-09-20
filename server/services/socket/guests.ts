import {
    addPendingInvite,
    demoteParticipant,
    isUserInvited,
    promoteParticipant,
    removePendingInvite,
} from "#services/redis/guests.ts";

export function guestsHandler({ io, socket }: Handler) {
    // Invite a user
    socket.on("guest.invite", async ({ roomId, userId }: { roomId: string; userId: string }) => {
        await addPendingInvite({ roomId, userId });
        io.to(roomId).emit("guest.invited", { userId, roomId });
    });

    // Accept invitation
    socket.on("guest.accept", async ({ roomId, userId }: { roomId: string; userId: string }) => {
        if (!(await isUserInvited({ roomId, userId }))) return;

        await promoteParticipant({ roomId, userId });
        io.to(roomId).emit("guest.accepted", { userId, roomId });
    });

    // Deny invitation
    socket.on("guest.deny", async ({ roomId, userId }: { roomId: string; userId: string }) => {
        await removePendingInvite({ roomId, userId });
        io.to(roomId).emit("guest.denied", { userId, roomId });
    });

    // Cancel invitation (by host)
    socket.on("guest.cancel", async ({ roomId, userId }: { roomId: string; userId: string }) => {
        await removePendingInvite({ roomId, userId });
        io.to(roomId).emit("guest.canceled", { userId, roomId });
    });

    // Revoke guest status (demote guest)
    socket.on("guest.revoke", async ({ roomId, userId }: { roomId: string; userId: string }) => {
        await demoteParticipant({ roomId, userId });
        io.to(roomId).emit("guest.revoked", { userId, roomId });
    });
}
