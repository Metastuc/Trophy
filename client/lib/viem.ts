import { createPublicClient, createWalletClient, custom, http, PublicClient } from "viem";

import { CLIENT_CONSTANTS, CLIENT_ENV } from "./constants";

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
