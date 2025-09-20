import {
    addPendingInvite,
    demoteParticipant,
    getActiveGuests,
    getPendingInvites,
    isUserInvited,
    promoteParticipant,
    removePendingInvite,
} from "#services/redis/guests.ts";

export function guestsHandler({ io, socket }: Handler) {
    // 🔄 Restore invitations on reconnect
    socket.on("guest.sync", async function ({ roomId, username }: { roomId: string; username: string }) {
        const invites = await getPendingInvites(roomId);
        const activeGuests = await getActiveGuests(roomId);

        const sent = invites.filter((invite) => invite.from === username).map((invite) => invite.to);
        const received = invites.filter((invite) => invite.to === username).map((invite) => invite.from);

        socket.emit("guest.invites.restore", { sent, received, activeGuests });
    });

    // 📩 Invite a user
    socket.on("guest.invite", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        await addPendingInvite({ roomId, fromUserId: from, toUserId: to });
        io.to(roomId).emit("guest.invited", { from, to, roomId });
    });

    // ✅ Accept invitation
    socket.on("guest.accept", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        if (!(await isUserInvited({ roomId, userId: to }))) return;

        await promoteParticipant({ roomId, userId: to });
        io.to(roomId).emit("guest.accepted", { from, to, roomId });
    });

    // ❌ Deny invitation
    socket.on("guest.deny", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        await removePendingInvite({ roomId, toUserId: to });
        io.to(roomId).emit("guest.denied", { from, to, roomId });
    });

    // 🚫 Cancel invitation (by inviter/host)
    socket.on("guest.cancel", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        await removePendingInvite({ roomId, toUserId: to });
        io.to(roomId).emit("guest.canceled", { from, to, roomId });
    });

    // 🔽 Revoke guest status (demote)
    socket.on("guest.revoke", async function ({ roomId, userId }: { roomId: string; userId: string }) {
        await demoteParticipant({ roomId, userId });
        io.to(roomId).emit("guest.revoked", { userId, roomId });
    });
}
