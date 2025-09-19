import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";

const pendingInviteKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:pendingInvites`;
const participantsKey = (roomId: string) => `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:participants`;

export async function addPendingInvite({ roomId, userId }: { roomId: string; userId: string }) {
    await redis.sadd(pendingInviteKey(roomId), userId);
}

export async function removePendingInvite({ roomId, userId }: { roomId: string; userId: string }) {
    await redis.srem(pendingInviteKey(roomId), userId);
}

export async function promoteParticipant({ roomId, userId }: { roomId: string; userId: string }) {
    const participants = await redis.smembers(participantsKey(roomId));
    const updated = participants.map(function (participant) {
        const parsed = JSON.parse(participant);
        if (parsed.id === userId) return JSON.stringify({ ...parsed, role: "guest" });
        return JSON.stringify(parsed);
    });

    await redis.del(participantsKey(roomId));
    if (updated && updated.length) await redis.sadd(participantsKey(roomId), ...updated);
}

export async function demoteParticipant({ roomId, userId }: { roomId: string; userId: string }) {
    const participants = await redis.smembers(participantsKey(roomId));
    const updated = participants.map(function (participant) {
        const parsed = JSON.parse(participant);
        if (parsed.id === userId) return JSON.stringify({ ...parsed, role: "listener" });
        return JSON.stringify(parsed);
    });

    await redis.del(participantsKey(roomId));
    if (updated && updated.length) await redis.sadd(participantsKey(roomId), ...updated);
}

export async function getPendingInvites(roomId: string): Promise<string[]> {
    return await redis.smembers(pendingInviteKey(roomId));
}

export async function isUserInvited({ roomId, userId }: { roomId: string; userId: string }): Promise<boolean> {
    return (await redis.sismember(pendingInviteKey(roomId), userId)) === 1 ? true : false;
}
