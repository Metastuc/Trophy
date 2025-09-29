import { EIP1193Provider } from "@privy-io/react-auth";
import { Address } from "viem";

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

export interface createTokenParams {
    address: Address;
    ethAmount: bigint;
    name: string;
    provider: EIP1193Provider;
    tokens: bigint;
};

export interface claimTokenParams {
    address: Address;
    coinAddress: Address;
    provider: EIP1193Provider;
    username: string;
};

export type TokenType = "USDC" | "ZORA" | "DEGEN" | "BNKR" | "FLAY" | "ETH";

type PermitDetails = {
    token: Address;
    amount: bigint;
    expiration: number;
    nonce: number;
};

export type PermitSingle = {
    details: PermitDetails;
    spender: Address;
    sigDeadline: bigint;
};

export interface TokenSwapParams {
    coinAddress: Address;
    amount: string;
    provider: EIP1193Provider;
    signTypedData: SignTypedData;
    address: Address;
    token: TokenType;
};

export type IintermediatePoolKey = {
    currency0: Address,
    currency1: Address,
    fee: number,
    tickSpacing: number,
    hooks: Address,
    hookData: Address,
} | undefined;