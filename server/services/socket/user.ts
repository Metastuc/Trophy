import { SERVER_CONSTANTS } from "#config/constants.ts";
import { redis } from "#config/redis.ts";

export function userHandler({ io, socket }: Handler) {
    socket.on("viewer.join", async function ({ identifier, roomId }: { identifier: string; roomId: string }) {
        socket.on("viewer.heartbeat", async function ({ identifier, roomId }: { identifier: string; roomId: string }) {
            await Promise.all([
                redis.sadd(`${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.LIVE(roomId)}`, identifier),
                redis.expire(
                    `${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.LIVE(roomId)}`,
                    SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.TTL,
                ),
            ]);
        });

        await Promise.all([
            redis.sadd(`${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.LIVE(roomId)}`, identifier),
            redis.sadd(`${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.ALL(roomId)}`, identifier),
            redis.expire(
                `${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.LIVE(roomId)}`,
                SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.TTL,
            ),
        ]);

        io.to(roomId).emit("viewer.count.update", {
            count: await redis.scard(`${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.LIVE(roomId)}`),
            roomId,
        });
    });

    socket.on("viewer.leave", async function ({ identifier, roomId }: { identifier: string; roomId: string }) {
        await redis.srem(`${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.LIVE(roomId)}`, identifier);

        io.to(roomId).emit("viewer.count.update", {
            count: await redis.scard(`${SERVER_CONSTANTS.REDIS_KEYS.VIEWERS.KEY.LIVE(roomId)}`),
            roomId,
        });
    });
}
