import {
    addPendingInvite,
    demoteParticipant,
    getActiveGuests,
    getPendingInvites,
    isUserInvited,
    promoteParticipant,
    removePendingInvite,
} from "#services/redis/guests.ts";

import { updateRoomStreamers, verifyRoomGuestLimit } from ".";

export function guestsHandler({ io, socket }: Handler) {
    socket.on("guest.sync", async function ({ roomId, username }: { roomId: string; username: string }) {
        const invites = await getPendingInvites(roomId);
        const activeGuests = await getActiveGuests(roomId);

        const sent = invites.filter((invite) => invite.from === username).map((invite) => invite.to);
        const received = invites.filter((invite) => invite.to === username).map((invite) => invite.from);

        socket.emit("guest.invites.restore", { sent, received, activeGuests });
    });

    socket.on("guest.invite", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        await addPendingInvite({ roomId, fromUserId: from, toUserId: to });
        io.to(roomId).emit("guest.invited", { from, to, roomId });
    });

    socket.on("guest.accept", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        if (!(await isUserInvited({ roomId, userId: to }))) return;

        await verifyRoomGuestLimit({ roomId, socket });
        await promoteParticipant({ roomId, userId: to });
        await updateRoomStreamers({ io, roomId });

        io.to(roomId).emit("guest.accepted", { from, to, roomId });
    });

    socket.on("guest.deny", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        await removePendingInvite({ roomId, toUserId: to });
        io.to(roomId).emit("guest.denied", { from, to, roomId });
    });

    socket.on("guest.cancel", async function ({ roomId, from, to }: { roomId: string; from: string; to: string }) {
        await removePendingInvite({ roomId, toUserId: to });
        io.to(roomId).emit("guest.canceled", { from, to, roomId });
    });

    socket.on("guest.revoke", async function ({ roomId, userId }: { roomId: string; userId: string }) {
        await demoteParticipant({ roomId, userId });
        await updateRoomStreamers({ io, roomId });
        io.to(roomId).emit("guest.revoked", { userId, roomId });
    });
}
