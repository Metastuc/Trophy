import { EIP1193Provider } from "@privy-io/react-auth";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { getEntryPoint, KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { Signer } from "@zerodev/sdk/types";
import { http } from "viem";

import { ENV_SCHEMA, network } from "./constants";
import { publicClient } from "./viem";

export const zeroDevSA = async ({ provider }: { provider: EIP1193Provider }) => {
  const entryPoint = getEntryPoint("0.7");

  const kernelValidator = await signerToEcdsaValidator(publicClient, {
    signer: provider as Signer,
    entryPoint,
    kernelVersion: KERNEL_V3_1,
  });

  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: kernelValidator,
    },
    entryPoint,
    kernelVersion: KERNEL_V3_1,
  });

  const paymasterClient = createZeroDevPaymasterClient({
    chain: network,
    transport: http(ENV_SCHEMA.ZERODEV_RPC),
  });

  return createKernelAccountClient({
    account,
    chain: network,
    bundlerTransport: http(ENV_SCHEMA.ZERODEV_RPC),
    client: publicClient,
    paymaster: {
      getPaymasterData(userOperation) {
          return paymasterClient.sponsorUserOperation({ userOperation });
      },
    },
  });
};
