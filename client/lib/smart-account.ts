import { EIP1193Provider } from "@privy-io/react-auth";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { getEntryPoint, KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { Signer } from "@zerodev/sdk/types";
import { http } from "viem";

import { CLIENT_CONSTANTS, CLIENT_ENV } from "./constants";
import { publicClient } from "./viem";

export async function initSmartAccount(provider: EIP1193Provider) {
    try {
        const entryPoint = getEntryPoint("0.7");

        return createKernelAccountClient({
            account: await createKernelAccount(publicClient, {
                entryPoint,
                plugins: {
                    sudo: await signerToEcdsaValidator(publicClient, {
                        entryPoint,
                        kernelVersion: KERNEL_V3_1,
                        signer: provider as Signer,
                    }),
                },
                kernelVersion: KERNEL_V3_1,
            }),
            bundlerTransport: http(CLIENT_ENV.VITE_ZERODEV_RPC),

            chain: CLIENT_CONSTANTS.CURRENT_NETWORK,

            client: publicClient,

            paymaster: {
                getPaymasterData(parameters) {
                    return createZeroDevPaymasterClient({
                        transport: http(CLIENT_ENV.VITE_ZERODEV_RPC),
                        chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
                    }).sponsorUserOperation({ userOperation: parameters });
                },
            },
        });
    } catch (error) {
        throw new Error("Failed to initialize smart account: " + (error as Error).message);
    }
}
