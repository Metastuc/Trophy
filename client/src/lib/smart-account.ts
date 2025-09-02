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
                    "https://paymaster.biconomy.io/api/v2/8453/WyEqvS_x5.0ee2c593-bf89-4e29-bf12-943e4417d959",
            }),
            bundlerUrl: "https://bundler.biconomy.io/api/v3/8453/bundler_5zKwM7o5jjsfUsXGuVhrTC",
        });

        return nexusAccountClient;
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
};
