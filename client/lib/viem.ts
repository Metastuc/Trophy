import { Address, createPublicClient, createWalletClient, custom, http, parseAbi, PublicClient } from "viem";
import { normalize } from "viem/ens";

import { log } from "#~/utils/logger.ts";

import { CLIENT_CONSTANTS, CLIENT_ENV } from "./constants";
import { formatEtherToToken } from "./utils";

export const publicClient = createPublicClient({
    chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
    transport: http(CLIENT_ENV.VITE_ALCHEMY_RPC),
}) as PublicClient;

export function getWalletClient({ address, provider }: GetWalletClient) {
    return createWalletClient({
        account: address,
        chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
        transport: custom(provider),
    });
}

export async function getWalletBalance({
    isNative = false,
    tokenAddress,
    userAddress,
}: {
    tokenAddress: Address;
    userAddress: Address;
    isNative?: boolean;
}): Promise<string> {
    log.info({
        data: { isNative, tokenAddress, userAddress },
        module: "VIEM",
        msg: "wallet balance fetched",
        tag: "WALLET BALANCE",
    });

    if (isNative) {
        return formatEtherToToken({
            number: await publicClient.getBalance({ address: userAddress }),
            toCreatorToken: false,
        });
    }

    return formatEtherToToken({
        number: await publicClient.readContract({
            abi: parseAbi(["function balanceOf(address owner) view returns (uint256)"]),
            args: [userAddress],
            functionName: "balanceOf",
            address: tokenAddress,
        }),
    });
}

export async function getBaseName({ name }: { name: string }) {
    return await publicClient.getEnsAddress({
        name: normalize(name),
    });
}
