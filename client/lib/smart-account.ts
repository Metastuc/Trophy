import {
    createBicoPaymasterClient,
    createSmartAccountClient,
    DEFAULT_MEE_VERSION,
    getMEEVersion,
    toNexusAccount,
} from "@biconomy/abstractjs";
import { EIP1193Provider } from "@privy-io/react-auth";
import { custom } from "viem";

import { CLIENT_CONSTANTS, CLIENT_ENV } from "./constants";

export async function initSmartAccount(provider: EIP1193Provider) {
    try {
        return createSmartAccountClient({
            account: await toNexusAccount({
                signer: provider,
                chainConfiguration: {
                    chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
                    transport: custom(provider),
                    version: getMEEVersion(DEFAULT_MEE_VERSION),
                },
            }),
            chain: CLIENT_CONSTANTS.CURRENT_NETWORK,
            paymaster: createBicoPaymasterClient({
                paymasterUrl: CLIENT_ENV.VITE_PAYMASTER_URL,
            }),
            bundlerUrl: CLIENT_ENV.VITE_BUNDLER_URL,
        });
    } catch (error) {
        throw new Error("Failed to initialize smart account: " + (error as Error).message);
    }
}
