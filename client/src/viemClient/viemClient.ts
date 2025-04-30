import { createPublicClient, createWalletClient, http, custom, type PublicClient, type WalletClient } from "viem";
import { useWallets } from "@privy-io/react-auth";
import { network } from "@/lib/constants";

const { wallets } = useWallets();
const privyWallet = wallets.find((w) => w.walletClientType === "privy");
const provider = await privyWallet?.getEthereumProvider();

let walletClient: WalletClient | undefined;

export const getPublicClient = () => {
  return createPublicClient({
    chain: network,
    transport: http(),
  }) as PublicClient;
}

export const getWalletClient = () => {
  if (!walletClient) {
    walletClient = createWalletClient({
      chain: network,
      transport: custom(provider!),
    });
  }

  return walletClient;
}
