import { createPublicClient, createWalletClient, custom, http, PublicClient } from "viem";

import { APPLICATION_CONSTANTS } from "./constants";

export const publicClient = createPublicClient({
    chain: APPLICATION_CONSTANTS.CURRENT_NETWORK,
    transport: http(),
}) as PublicClient;

export function getWalletClient({ address, provider }: GetWalletClient) {
    return createWalletClient({
        account: address,
        chain: APPLICATION_CONSTANTS.CURRENT_NETWORK,
        transport: custom(provider),
    });
}
