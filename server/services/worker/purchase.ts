import { Queue, Worker } from "bullmq";
import { Address } from "viem";

import { log } from "#~/utils/logger.ts";
import { toTime } from "#~/utils/time.ts";
import { truncateWalletAddress } from "#~/utils/truncate.ts";
import { verifyTransactionOnChain } from "#app/transaction/utils.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { sendTokenPurchasedEmail } from "#services/email/purchase.ts";
import { logger } from "#utils/logger.ts";

export const purchaseQueue = new Queue("purchases", {
    connection: redis,
    defaultJobOptions: {
        removeOnComplete: { age: toTime({ unit: "hours", value: 1 }), count: 100 },
        removeOnFail: { age: toTime({ unit: "days", value: 1 }), count: 500 },
    },
});

new Worker(
    "purchases",
    async function (job) {
        const { amountInToken, amountOutToken, amountRaw, buyer, creator, fromSymbol, toAddress, txHash } = job.data;

        const creatorUser = await prisma.user.findUnique({
            where: { username: creator },
            include: { creatorToken: true },
        });

        if (!creatorUser) {
            logger.error({ creator }, "Creator not found");
            throw new Error(`Creator ${creator} not found`);
        }

        if (!creatorUser.creatorToken) {
            logger.error({ creator }, "Creator token not found");
            throw new Error(`Creator token for ${creator} not found`);
        }

        logger.info({ txHash }, "Verifying purchase transaction");

        await verifyTransactionOnChain({
            amountRaw: BigInt(amountRaw),
            recipient: creatorUser.creatorToken.smartAccount as Address,
            sender: buyer,
            token: fromSymbol as TokenIdentifier,
            tokenAddress: toAddress,
            txHash,
        });

        const buyerUser = await prisma.user.findUnique({
            where: { walletAddress: buyer },
        });

        const buyerDisplayName = buyerUser
            ? (buyerUser.username ?? truncateWalletAddress(buyerUser.walletAddress as Address))
            : truncateWalletAddress(buyer);

        if (buyerUser) {
            await prisma.holding.upsert({
                where: {
                    userId_creatorTokenId: {
                        userId: buyerUser.id,
                        creatorTokenId: creatorUser.creatorToken.id,
                    },
                },
                update: {
                    amount: { increment: parseFloat(amountInToken) },
                },
                create: {
                    user: { connect: { id: buyerUser.id } },
                    creatorToken: { connect: { id: creatorUser.creatorToken.id } },
                    amount: parseFloat(amountInToken),
                },
            });

            logger.info(
                { buyer: buyerUser.walletAddress, creator: creatorUser.username },
                "Purchase recorded in holdings",
            );
        } else logger.warn({ buyerDisplayName }, "Anonymous buyer detected, skipping holdings update");

        const purchase = await prisma.purchase.create({
            data: {
                wallet: buyer,
                user: buyerUser ? { connect: { id: buyerUser.id } } : undefined,
                amount: parseFloat(amountOutToken),
                tokenId: creatorUser.creatorToken.id,
                txHash,
            },
        });

        await prisma.notification.create({
            data: {
                user: { connect: { id: creatorUser.id } },
                type: "PURCHASE",
                message: `${buyerDisplayName} purchased your token for ${amountOutToken} ${creatorUser.creatorToken.symbol}!`,
                purchase: { connect: { id: purchase.id } },
            },
        });

        logger.info({ txHash, buyer, creator }, "✅ Purchase verification & storage complete");

        const uniqueHolders = await prisma.holding.count({
            where: { creatorTokenId: creatorUser.creatorToken.id },
        });

        await prisma.stats.upsert({
            where: { userId: creatorUser.id },
            update: { holdingCount: uniqueHolders },
            create: { userId: creatorUser.id, holdingCount: uniqueHolders },
        });

        sendTokenPurchasedEmail({
            amount: `${amountOutToken} ${creatorUser.creatorToken.symbol}`,
            buyer: buyerDisplayName,
            email: creatorUser.email,
            username: creatorUser.username,
        });
    },
    { connection: redis, concurrency: 5 },
)
    .on("completed", (job) => {
        log.info({ module: "purchase-worker", msg: `🎉 Job ${job.id} completed` });
        logger.info({ jobId: job.id }, "Job completed");
    })
    .on("failed", (job, err) => {
        log.error({ module: "purchase-worker", msg: `💥 Job ${job?.id} failed`, data: err.message });
        logger.error({ jobId: job?.id, error: err }, "Job failed");
    });
