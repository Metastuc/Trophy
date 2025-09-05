/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createBicoPaymasterClient,
    createSmartAccountClient,
    DEFAULT_MEE_VERSION,
    getMEEVersion,
    toNexusAccount,
} from "@biconomy/abstractjs";
import { EIP1193Provider } from "@privy-io/react-auth";
import { custom } from "viem";

import { ENV_SCHEMA, network } from "@/lib/constants";

export const getSmartAccount = async (provider: EIP1193Provider) => {
    try {
        const nexusAccountClient = createSmartAccountClient({
            account: await toNexusAccount({
                signer: provider,
                chainConfiguration: {
                    chain: network,
                    transport: custom(provider),
                    version: getMEEVersion(DEFAULT_MEE_VERSION),
                },
            }),
            chain: network,
            paymaster: createBicoPaymasterClient({
                paymasterUrl:
                    ENV_SCHEMA.PAYMASTER,
            }),
            bundlerUrl: ENV_SCHEMA.BUNDLER,
        });

        return nexusAccountClient;
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
};
