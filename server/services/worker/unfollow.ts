import { Queue, Worker } from "bullmq";

import { log } from "#~/utils/logger.ts";
import { toTime } from "#~/utils/time.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { logger } from "#utils/logger.ts";

export const unFollowQueue = new Queue("unfollows", {
    connection: redis,
    defaultJobOptions: {
        removeOnComplete: { age: toTime({ unit: "hours", value: 1 }), count: 100 },
        removeOnFail: { age: toTime({ unit: "days", value: 1 }), count: 500 },
    },
});

new Worker(
    "unfollows",
    async function (job) {
        const { whoWantsToUnfollow, whoIsToBeUnfollowed } = job.data;

        const [unfollowerStats, unfollowedStats] = await Promise.all([
            prisma.stats.findUnique({ where: { userId: whoWantsToUnfollow.id } }),
            prisma.stats.findUnique({ where: { userId: whoIsToBeUnfollowed.id } }),
        ]);

        await Promise.all([
            prisma.stats.upsert({
                where: { userId: whoWantsToUnfollow.id },
                create: { userId: whoWantsToUnfollow.id, followingCount: 0 },
                update: {
                    followingCount: { decrement: unfollowerStats && unfollowerStats.followingCount > 0 ? 1 : 0 },
                },
            }),

            prisma.stats.upsert({
                where: { userId: whoIsToBeUnfollowed.id },
                create: { userId: whoIsToBeUnfollowed.id, followerCount: 0 },
                update: { followerCount: { decrement: unfollowedStats && unfollowedStats.followerCount > 0 ? 1 : 0 } },
            }),
        ]);
    },
    { connection: redis, concurrency: 5 },
)
    .on("completed", (job) => {
        log.info({ module: "unfollows-worker", msg: `🎉 Job ${job.id} completed` });
        logger.info({ jobId: job.id }, "Job completed");
    })
    .on("failed", (job, err) => {
        log.error({ module: "unfollows-worker", msg: `💥 Job ${job?.id} failed`, data: err.message });
        logger.error({ jobId: job?.id, error: err }, "Job failed");
    });
