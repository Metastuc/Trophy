import { Address, createPublicClient, createWalletClient, custom, http, parseAbi, PublicClient } from "viem";

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

export async function getWalletBalance({ tokenAddress, userAddress }: { tokenAddress: Address; userAddress: Address }) {
    return {
        tokenBalance:
            formatEtherToToken({
                number: await publicClient.readContract({
                    abi: parseAbi(["function balanceOf(address owner) view returns (uint256)"]),
                    args: [userAddress],
                    functionName: "balanceOf",
                    address: tokenAddress,
                }),
            }) ?? 0,

        etherBalance:
            formatEtherToToken({
                number: await publicClient.getBalance({ address: userAddress }),
                toCreatorToken: false,
            }) ?? 0,
    };
}
