import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";

interface RoomInRedisParams {
    hostId: string;
    roomId: string;
    walletAddress: string;
}

export async function createRoomInRedis({ hostId, roomId, walletAddress }: RoomInRedisParams) {
    const roomKey = SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId);

    await redis.set(`liveroom:${walletAddress}`, roomId);
    await redis.hmset(roomKey, { host: hostId, status: "LIVE", createdAt: new Date().toISOString() });
    await addParticipantToRoom({ role: "host", roomId, id: hostId, peerId: undefined });
}

export async function addParticipantToRoom(participant: RedisParticipant & { roomId: string }) {
    const { roomId, ...rest } = participant;
    const participantsKey = `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:participants`;

    const existing = await redis.hget(participantsKey, rest.id);
    const parsedExisting = existing ? JSON.parse(existing) : {};

    await redis.hset(participantsKey, rest.id, JSON.stringify({ ...rest, ...parsedExisting }));
}

export async function removeParticipantFromRoom({ userId, roomId }: { userId: string; roomId: string }) {
    const participantsKey = `${SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId)}:participants`;
    return (await redis.hdel(participantsKey, userId)) > 0;
}

export async function getRoom(roomId: string): Promise<RedisRoom> {
    const roomKey = SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId);
    const participantsKey = `${roomKey}:participants`;

    const [roomData, allParticipants] = await Promise.all([redis.hgetall(roomKey), redis.hgetall(participantsKey)]);

    if (!roomData.host || !roomData.status || !roomData.createdAt) {
        throw new Error(`Room ${roomId} is missing required fields in Redis`);
    }

    const participants: Array<RedisParticipant> = Object.values(allParticipants).map((participant) =>
        JSON.parse(participant),
    );

    const invitedGuests = roomData.guests ? JSON.parse(roomData.guests) : [];

    return { host: roomData.host, status: roomData.status, createdAt: roomData.createdAt, participants, invitedGuests };
}

export async function endRoomInRedis({ walletAddress }: RoomInRedisParams) {
    await redis.del(`liveroom:${walletAddress}`);
}
