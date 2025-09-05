import {
    createBicoPaymasterClient,
    createSmartAccountClient,
    DEFAULT_MEE_VERSION,
    getMEEVersion,
    toNexusAccount,
} from "@biconomy/abstractjs";
import { EIP1193Provider } from "@privy-io/react-auth";
import { custom } from "viem";

import { APPLICATION_CONSTANTS, ENV_SCHEMA } from "./constants";

export async function initSmartAccount(provider: EIP1193Provider) {
    try {
        return createSmartAccountClient({
            account: await toNexusAccount({
                signer: provider,
                chainConfiguration: {
                    chain: APPLICATION_CONSTANTS.CURRENT_NETWORK,
                    transport: custom(provider),
                    version: getMEEVersion(DEFAULT_MEE_VERSION),
                },
            }),
            chain: APPLICATION_CONSTANTS.CURRENT_NETWORK,
            paymaster: createBicoPaymasterClient({
                paymasterUrl: ENV_SCHEMA.PAYMASTER_URL,
            }),
            bundlerUrl: ENV_SCHEMA.BUNDLER_URL,
        });
    } catch (error) {
        throw new Error("Failed to initialize smart account: " + (error as Error).message);
    }
}
