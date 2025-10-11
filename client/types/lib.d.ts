import { EIP1193Provider, SignMessageModalUIOptions, SignTypedDataParams } from "@privy-io/react-auth";
import { Address } from "viem";

import { CONTRACT_ADDRESSES, SUPPORTED_TOKENS } from "#~/store/supported-tokens.ts";

declare global {
    type TokenAddresses = keyof typeof CONTRACT_ADDRESSES;
    type TokenSymbols = keyof typeof SUPPORTED_TOKENS;

    interface GetWalletClient {
        address: Address;
        provider: EIP1193Provider;
    }

    interface FlaunchCreatorToken {
        tokenName: string;
        creatorAddress: Address;
        provider: EIP1193Provider;
        ethereumAmountRequiredToFlaunch: bigint;
        tokensCreatorWillOwn: bigint;
    }

    interface TokenSwapParams {
        address: Address;
        amount: string;
        coinAddress: Address;
        provider: EIP1193Provider;
        signTypedData: (
            input: SignTypedDataParams,
            options?: {
                uiOptions?: SignMessageModalUIOptions;
                address?: string;
            },
        ) => Promise<{
            signature: string;
        }>;
        token: TokenIdentifier;
    }

    interface PoolKey {
        currency0: Address;
        currency1: Address;
        fee: number;
        hookData: Address;
        hooks: Address;
        tickSpacing: number;
    }

    interface PermitSingle {
        details: {
            token: string;
            amount: number | BigNumber;
            expiration: number | BigNumber;
            nonce: number | BigNumber;
        };
        spender: string;
        sigDeadline: number | BigNumber;
    }
}

export {};
