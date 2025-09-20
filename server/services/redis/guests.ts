import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";

const pendingInviteKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:pendingInvites`;
const participantsKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:participants`;
const roomKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}`;

// Add user to pending invites and room.invitedGuests array
export async function addPendingInvite({ roomId, userId }: { roomId: string; userId: string }) {
    await redis.sadd(pendingInviteKey(roomId), userId);

    const roomData = await redis.hget(roomKey(roomId), "guests");
    const guests = roomData ? JSON.parse(roomData) : [];
    if (!guests.includes(userId)) guests.push(userId);
    await redis.hset(roomKey(roomId), "guests", JSON.stringify(guests));
}

// Remove user from pending invites and room.invitedGuests
export async function removePendingInvite({ roomId, userId }: { roomId: string; userId: string }) {
    await redis.srem(pendingInviteKey(roomId), userId);

    const roomData = await redis.hget(roomKey(roomId), "guests");
    const guests = roomData ? JSON.parse(roomData) : [];
    const updatedGuests = guests.filter((id: string) => id !== userId);
    await redis.hset(roomKey(roomId), "guests", JSON.stringify(updatedGuests));
}

// Promote user from listener to guest
export async function promoteParticipant({ roomId, userId }: { roomId: string; userId: string }) {
    const participants = await redis.hgetall(participantsKey(roomId));
    if (!participants[userId]) return;

    const parsed = JSON.parse(participants[userId]);
    const updated = { ...parsed, role: "guest" };
    await redis.hset(participantsKey(roomId), userId, JSON.stringify(updated));

    await removePendingInvite({ roomId, userId });
}

// Demote guest back to listener
export async function demoteParticipant({ roomId, userId }: { roomId: string; userId: string }) {
    const participants = await redis.hgetall(participantsKey(roomId));
    if (!participants[userId]) return;

    const parsed = JSON.parse(participants[userId]);
    const updated = { ...parsed, role: "listener" };
    await redis.hset(participantsKey(roomId), userId, JSON.stringify(updated));
}

// Get all pending invites
export async function getPendingInvites(roomId: string): Promise<string[]> {
    return await redis.smembers(pendingInviteKey(roomId));
}

// Check if a user is invited
export async function isUserInvited({ roomId, userId }: { roomId: string; userId: string }): Promise<boolean> {
    return (await redis.sismember(pendingInviteKey(roomId), userId)) === 1;
}
