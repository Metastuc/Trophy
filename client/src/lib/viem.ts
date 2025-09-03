import { EIP1193Provider } from "@privy-io/react-auth";
import { Address, createPublicClient, createWalletClient, custom, http, type PublicClient } from "viem";
import { baseSepolia } from "viem/chains"

// import { network } from "@/lib/constants";

export const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
}) as PublicClient;

export const getWalletClient = (provider: EIP1193Provider, address?: Address) => {
    return createWalletClient({
        chain: baseSepolia,
        transport: custom(provider),
        account: address,
    });
};
