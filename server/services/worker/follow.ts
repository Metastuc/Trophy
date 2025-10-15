import { Queue, Worker } from "bullmq";

import { log } from "#~/utils/logger.ts";
import { toTime } from "#~/utils/time.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { logger } from "#utils/logger.ts";

export const followQueue = new Queue("follows", {
    connection: redis,
    defaultJobOptions: {
        removeOnComplete: { age: toTime({ unit: "hours", value: 1 }), count: 100 },
        removeOnFail: { age: toTime({ unit: "days", value: 1 }), count: 500 },
    },
});

new Worker(
    "follows",
    async function (job) {
        const { follower, following } = job.data;

        const follow = await prisma.follow.create({
            data: { followerId: follower.id, followingId: following.id },
        });

        await Promise.all([
            prisma.stats.upsert({
                where: { userId: follower?.id },
                create: { userId: follower?.id, followingCount: 1 },
                update: { followingCount: { increment: 1 } },
            }),

            prisma.stats.upsert({
                where: { userId: following?.id },
                create: { userId: following?.id, followerCount: 1 },
                update: { followerCount: { increment: 1 } },
            }),

            prisma.notification.create({
                data: {
                    userId: following?.id,
                    type: "FOLLOW",
                    message: `${follower?.username} started following you.`,
                    follow: { connect: { id: follow.id } },
                },
            }),
        ]);
    },
    { connection: redis, concurrency: 5 },
)
    .on("completed", (job) => {
        log.info({ module: "follows-worker", msg: `🎉 Job ${job.id} completed` });
        logger.info({ jobId: job.id }, "Job completed");
    })
    .on("failed", (job, err) => {
        log.error({ module: "follows-worker", msg: `💥 Job ${job?.id} failed`, data: err.message });
        logger.error({ jobId: job?.id, error: err }, "Job failed");
    });
