import { createPublicClient, createWalletClient, custom, http, PublicClient } from "viem";

import { CLIENT_CONSTANTS } from "./constants";

export const publicClient = createPublicClient({
    chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
    transport: http(),
}) as PublicClient;

export function getWalletClient({ address, provider }: GetWalletClient) {
    return createWalletClient({
        account: address,
        chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
        transport: custom(provider),
    });
}
