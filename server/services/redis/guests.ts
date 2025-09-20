import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";

const pendingInviteKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:pendingInvites`;
const participantsKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:participants`;
const roomKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}`;

export async function addPendingInvite({
    roomId,
    fromUserId,
    toUserId,
}: {
    roomId: string;
    fromUserId: string;
    toUserId: string;
}) {
    await redis.hset(pendingInviteKey(roomId), toUserId, fromUserId);
}

export async function removePendingInvite({ roomId, toUserId }: { roomId: string; toUserId: string }) {
    await redis.hdel(pendingInviteKey(roomId), toUserId);
}

/**
 * Promote user from listener to guest
 */
export async function promoteParticipant({ roomId, userId }: { roomId: string; userId: string }) {
    const participants = await redis.hgetall(participantsKey(roomId));
    if (!participants[userId]) return;

    const parsed = JSON.parse(participants[userId]);
    const updated = { ...parsed, role: "guest" };
    await redis.hset(participantsKey(roomId), userId, JSON.stringify(updated));

    await removePendingInvite({ roomId, toUserId: userId });

    const roomData = await redis.hget(roomKey(roomId), "guests");
    const guests = roomData ? JSON.parse(roomData) : [];
    if (!guests.includes(userId)) {
        guests.push(userId);
        await redis.hset(roomKey(roomId), "guests", JSON.stringify(guests));
    }
}

/**
 * Demote guest back to listener
 */
export async function demoteParticipant({ roomId, userId }: { roomId: string; userId: string }) {
    const participants = await redis.hgetall(participantsKey(roomId));
    if (!participants[userId]) return;

    const parsed = JSON.parse(participants[userId]);
    const updated = { ...parsed, role: "listener" };
    await redis.hset(participantsKey(roomId), userId, JSON.stringify(updated));
}

/**
 * Get all pending invites in a room
 * -> returns array of { from, to }
 */
export async function getPendingInvites(roomId: string): Promise<{ from: string; to: string }[]> {
    const raw = await redis.hgetall(pendingInviteKey(roomId));
    return Object.entries(raw).map(([to, from]) => ({ from, to }));
}

/**
 * Check if a user is invited
 */
export async function isUserInvited({ roomId, userId }: { roomId: string; userId: string }): Promise<boolean> {
    const exists = await redis.hexists(pendingInviteKey(roomId), userId);
    return exists === 1;
}

export async function getActiveGuests(roomId: string): Promise<string[]> {
    const participants = await redis.hgetall(participantsKey(roomId));
    return Object.entries(participants)
        .filter(([_, participant]) => JSON.parse(participant).role === "guest")
        .map(([id]) => id);
}
