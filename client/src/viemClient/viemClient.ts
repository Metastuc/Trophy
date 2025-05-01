import { createPublicClient, createWalletClient, http, custom, type PublicClient, type WalletClient } from "viem";
import { ConnectedWallet } from "@privy-io/react-auth";
import { network } from "@/lib/constants";

let walletClient: WalletClient | undefined;

export const getPublicClient = () => {
  return createPublicClient({
    chain: network,
    transport: http(),
  }) as PublicClient;
}

export const getWalletClient = async (wallet: ConnectedWallet) => {
  if (!walletClient) {
    const provider = await wallet.getEthereumProvider();
    walletClient = createWalletClient({
      chain: network,
      transport: custom(provider!),
    });
  }

  return walletClient;
}
