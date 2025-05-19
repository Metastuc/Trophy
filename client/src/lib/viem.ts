import { network } from "@/lib/constants";
import { EIP1193Provider } from "@privy-io/react-auth";
import {
    type PublicClient,
    type WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    http,
} from "viem";

let walletClient: WalletClient | undefined;

export const getPublicClient = () => {
    return createPublicClient({
        chain: network,
        transport: http(),
    }) as PublicClient;
};

export const getWalletClient = async (provider: EIP1193Provider) => {
    if (!walletClient) {
        walletClient = createWalletClient({
            chain: network,
            transport: custom(provider!),
        });
    }

    return walletClient;
};
