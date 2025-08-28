import { EIP1193Provider } from "@privy-io/react-auth";
import { createPublicClient, createWalletClient, custom, http, type PublicClient, type WalletClient } from "viem";

import { network } from "@/lib/constants";

let walletClient: WalletClient | undefined;

export const publicClient = createPublicClient({
    chain: network,
    transport: http(),
}) as PublicClient;

export const getWalletClient = (provider: EIP1193Provider): WalletClient => {
    if (!walletClient) {
        walletClient = createWalletClient({
            chain: network,
            transport: custom(provider!),
        });
    }

    return walletClient;
};
