import { Role } from "@huddle01/server-sdk/auth";

import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";

interface RoomInRedisParams {
    hostId: string;
    roomId: string;
    walletAddress: string;
}

export async function createRoomInRedis({ hostId, roomId, walletAddress }: RoomInRedisParams) {
    const roomKey = SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId);

    await Promise.all([
        redis.set(`liveroom:${walletAddress}`, roomId),
        redis.hmset(roomKey, { host: hostId, status: "LIVE", createdAt: new Date().toISOString() }),
        addParticipantToRoom({ role: "host", roomId, userId: hostId }),
    ]);
}

export async function addParticipantToRoom({ role, roomId, userId }: { roomId: string; userId: string; role: Role }) {
    const roomKey = SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId);
    const participantsKey = `${roomKey}:participants`;

    await redis.sadd(participantsKey, JSON.stringify({ id: userId, role }));
}

export async function getRoom(roomId: string): Promise<RedisRoom> {
    const roomKey = SERVER_CONSTANTS.REDIS_KEYS.ROOM.KEY(roomId);

    const roomData = await redis.hgetall(roomKey);
    const allParticipants = await redis.smembers(`${roomKey}:participants`);
    const participants: Array<RedisParticipant> = allParticipants.map((participant) => JSON.parse(participant));

    if (!roomData.host || !roomData.status || !roomData.createdAt) {
        throw new Error(`Room ${roomId} is missing required fields in Redis`);
    }

    const invitedGuests = roomData.guests ? JSON.parse(roomData.guests) : [];

    return { host: roomData.host, status: roomData.status, createdAt: roomData.createdAt, participants, invitedGuests };
}

export async function endRoomInRedis({ walletAddress }: RoomInRedisParams) {
    await redis.del(`liveroom:${walletAddress}`);
}
