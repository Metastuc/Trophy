import { Queue, Worker } from "bullmq";
import { decodeEventLog, parseAbiItem } from "viem";

import { log } from "#~/utils/logger.ts";
import { toTime } from "#~/utils/time.ts";
import { truncateWalletAddress } from "#~/utils/truncate.ts";
import { prisma } from "#config/prisma.ts";
import { redis } from "#config/redis.ts";
import { getIO } from "#config/socket.ts";
import { client } from "#config/viem.ts";
import { User } from "#generated/prisma/index.js";
import { logger } from "#utils/logger.ts";

export const tipsQueue = new Queue("tips", {
    connection: redis,
    defaultJobOptions: {
        removeOnComplete: { age: toTime({ unit: "hours", value: 1 }), count: 100 },
        removeOnFail: { age: toTime({ unit: "days", value: 1 }), count: 500 },
    },
});

new Worker(
    "tips",
    async function (job) {
        const {
            amountInToken,
            amountRaw,
            amountUsd,
            chainId,
            isAuthenticated,
            recipient,
            sender,
            token,
            tokenAddress,
            txHash,
        } = job.data;

        let senderUserAccount = null as null | User;
        if (isAuthenticated && sender) {
            senderUserAccount = await prisma.user.findUnique({ where: { walletAddress: sender } });
        }

        const receipt = await client.waitForTransactionReceipt({ hash: txHash });

        if (receipt.status !== "success") {
            logger.error({ txHash, status: receipt.status }, "Transaction failed");
            throw new Error(`Transaction ${txHash} failed`);
        }

        let valid = false;

        if (token === "ETH") {
            const tx = await client.getTransaction({ hash: txHash });
            valid =
                tx.from.toLowerCase() === sender.toLowerCase() &&
                tx.to?.toLowerCase() === recipient.toLowerCase() &&
                tx.value === BigInt(amountRaw);

            if (!valid) {
                logger.error({ txHash }, "ETH transfer mismatch");
                throw new Error(`ETH transfer mismatch for ${txHash}`);
            }
        } else {
            const transferEvent = parseAbiItem(
                "event Transfer(address indexed from, address indexed to, uint256 value)",
            );

            const logFound = receipt.logs.find((log) => {
                if (log.address.toLowerCase() !== tokenAddress?.toLowerCase()) return false;

                try {
                    const parsed = decodeEventLog({
                        abi: [transferEvent],
                        data: log.data,
                        topics: log.topics,
                    });

                    return (
                        parsed.args.from.toLowerCase() === sender.toLowerCase() &&
                        parsed.args.to.toLowerCase() === recipient.toLowerCase() &&
                        parsed.args.value === BigInt(amountRaw)
                    );
                } catch {
                    return false;
                }
            });

            valid = Boolean(logFound);

            if (!valid) {
                logger.error({ txHash }, "Transfer event not found");
                throw new Error(`ERC20 transfer mismatch for ${txHash}`);
            }
        }

        const tip = await prisma.tip.create({
            data: {
                txHash,
                chainId,
                token,
                tokenAddress,
                amount: parseFloat(amountInToken),
                amountRaw,
                amountUsd,
                user: { connect: { walletAddress: recipient } },
                ...(sender ? { tipper: { connect: { walletAddress: sender } } } : { tipperWallet: sender }),
                notification: {
                    create: {
                        user: { connect: { walletAddress: recipient } },
                        type: "TIP",
                        message: `You received ${amountUsd?.toFixed(2)} USD in ${token}!`,
                    },
                },
            },
        });

        const roomId = await redis.get(`liveroom:${recipient}`);
        if (roomId) {
            const payload = {
                type: "tip",
                message: `tipped ${amountInToken} ${token}.`,
                user:
                    isAuthenticated && senderUserAccount?.username
                        ? { username: senderUserAccount.username, profileImage: senderUserAccount.profileImage }
                        : { username: truncateWalletAddress(sender), profileImage: null },
            };

            await redis.rpush(`room:${roomId}:messages`, JSON.stringify(payload));
            getIO().to(roomId).emit("chat.receive.tip", { roomId, payload });
        }

        logger.info({ txHash, tipId: tip.id }, "Tip stored successfully");
    },
    { connection: redis },
)
    .on("completed", (job) => {
        log.info({ module: "tip-worker", msg: `🎉 Job ${job.id} completed` });
        logger.info({ jobId: job.id }, "Job completed");
    })
    .on("failed", (job, err) => {
        log.error({ module: "tip-worker", msg: `💥 Job ${job?.id} failed`, data: err.message });
        logger.error({ jobId: job?.id, error: err }, "Job failed");
    });
