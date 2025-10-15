import { EIP1193Provider, SignMessageModalUIOptions, SignTypedDataParams } from "@privy-io/react-auth";
import { Address } from "viem";

import { CONTRACT_ADDRESSES, SUPPORTED_TOKENS } from "#~/store/supported-tokens.ts";

declare global {
    type TokenAddresses = keyof typeof CONTRACT_ADDRESSES;
    type TokenSymbols = keyof typeof SUPPORTED_TOKENS;

    interface GetWalletClient {
        address?: Address;
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

    type MessageProp = {
        name: string;
        type: string;
    };

    type MessageTypes = {
        [additionalProperties: string]: MessageProp[];
    };

    type TypedDataParams<T extends MessageTypes> = {
        types: T;
        primaryType: keyof T;
        domain: {
            name?: string;
            version?: string;
            chainId?: number;
            verifyingContract?: string;
            salt?: ArrayBuffer;
        };
        message: Record<string, unknown>;
    };

    type SignTypedDataParams = TypedDataParams<MessageTypes>;

    export type SignTypedData = (
        input: SignTypedDataParams,
        options: { address: string },
    ) => Promise<{
        signature: string;
    }>;

    interface claimTokenParams {
        address: Address;
        coinAddress: Address;
        provider: EIP1193Provider;
        username: string;
    }

    type TokenType = "USDC" | "ZORA" | "DEGEN" | "BNKR" | "FLAY" | "ETH";

    type PermitDetails = {
        token: Address;
        amount: bigint;
        expiration: number;
        nonce: number;
    };

    interface PermitSingle {
        details: PermitDetails;
        spender: Address;
        sigDeadline: bigint;
    };

    interface TokenSwapParams {
        coinAddress: Address;
        amount: string;
        provider: EIP1193Provider;
        signTypedData: SignTypedData;
        address: Address;
        token: TokenType;
    }

    interface CreatorSwapQuoteParams {
        amount: string;
        coinAddress: Address;
        supportedTokenToCreatorToken: boolean;
        token: TokenType;
    }

    type IintermediatePoolKey = {
        currency0: Address;
        currency1: Address;
        fee: number;
        tickSpacing: number;
        hooks: Address;
        hookData: Address;
    } | undefined;
}

export {};
