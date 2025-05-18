/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENV_SCHEMA, network } from "@/lib/constants";
import { createBicoPaymasterClient, createSmartAccountClient, toNexusAccount } from "@biconomy/abstractjs";
import { custom } from "viem";
import { EIP1193Provider } from "@privy-io/react-auth";

export const getSmartAccount = async (provider: EIP1193Provider) => {
  try {
    const nexusAccountClient = createSmartAccountClient({
      account: await toNexusAccount({
        signer: provider,
        chain: network,
        transport: custom(provider),
      }),
      paymaster: createBicoPaymasterClient({ paymasterUrl: ENV_SCHEMA.PAYMASTER_URL }),
    });

    return nexusAccountClient.account.walletClient;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};