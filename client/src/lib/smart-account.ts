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
import { baseSepolia } from "viem/chains";

import { ENV_SCHEMA, network } from "@/lib/constants";

export const getSmartAccount = async (provider: EIP1193Provider) => {
    try {
        const nexusAccountClient = createSmartAccountClient({
            account: await toNexusAccount({
                signer: provider,
                chainConfiguration: {
                    chain: baseSepolia,
                    transport: custom(provider),
                    version: getMEEVersion(DEFAULT_MEE_VERSION),
                },
            }),
            chain: baseSepolia,
            paymaster: createBicoPaymasterClient({
                paymasterUrl:
                    "https://paymaster.biconomy.io/api/v2/84532/YoPMO7wuc.a62f6b6b-74d1-4955-9790-4021f242c510",
            }),
            bundlerUrl: "https://bundler.biconomy.io/api/v3/84532/bundler_3EuqxbGSNpmeCG9osoP4uL",
        });

        return nexusAccountClient;
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
};
