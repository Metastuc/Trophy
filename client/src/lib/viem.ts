import { EIP1193Provider } from "@privy-io/react-auth";
import { Address, createPublicClient, createWalletClient, custom, http, type PublicClient } from "viem";

import { network } from "@/lib/constants";

export const publicClient = createPublicClient({
    chain: network,
    transport: http(),
}) as PublicClient;

export const getWalletClient = (provider: EIP1193Provider, address?: Address) => {
    return createWalletClient({
        chain: network,
        transport: custom(provider!),
        account: address,
    });
};
