import { Prisma } from "#generated/prisma/index.js";

interface UpdateStatsParams {
    field: "followerCount" | "followingCount";
    id: string;
    operation: "increment" | "decrement";
    transaction: Prisma.TransactionClient;
}

export async function updateStats({ field, id, operation, transaction }: UpdateStatsParams) {
    const userStats = await transaction.stats.findUnique({ where: { userId: id } });

    if (operation === "increment") {
        return transaction.stats.upsert({
            where: { userId: id },
            create: { userId: id, [field]: 1 },
            update: { [field]: { increment: 1 } },
        });
    }

    return transaction.stats.upsert({
        where: { userId: id },
        create: { userId: id, [field]: 0 },
        update: { [field]: { decrement: userStats && userStats[field] > 0 ? 1 : 0 } },
    });
}
