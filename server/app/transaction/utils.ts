import { Address, decodeEventLog, parseAbiItem } from "viem";

import { client } from "#config/viem.ts";
import { logger } from "#utils/logger.ts";

export async function verifyTransactionOnChain({
    amountRaw,
    recipient,
    sender,
    token,
    txHash,
    tokenAddress,
}: {
    amountRaw: bigint;
    recipient: Address;
    sender: Address;
    token: TokenIdentifier;
    tokenAddress?: Address;
    txHash: Address;
}) {
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

        return true;
    } else {
        const transferEvent = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)");

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

        return true;
    }
}
